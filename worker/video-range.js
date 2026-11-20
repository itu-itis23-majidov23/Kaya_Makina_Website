// Byte-range support for the videos.
//
// Cloudflare's static-asset server answers a Range request with the whole
// file (200 OK). Safari on iPhone, iPad and Mac only plays a <video> when the
// server can return partial content (206), so without this the clips would
// not play there. Requests under /video/ are routed to this script first
// (`run_worker_first` in wrangler.jsonc); every other URL is served straight
// from the asset store and never reaches it.

/**
 * @param {string} header  value of the Range request header
 * @param {number} size    size of the file in bytes
 * @returns {{ start: number, end: number } | "unsatisfiable" | null}
 *          null means "not a single byte range" — answer with the whole file
 */
function parseRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match) return null;
  const [, first, last] = match;
  if (first === "" && last === "") return null;

  let start;
  let end;
  if (first === "") {
    // "bytes=-500": the final 500 bytes
    const length = Number(last);
    if (length === 0) return "unsatisfiable";
    start = Math.max(size - length, 0);
    end = size - 1;
  } else {
    start = Number(first);
    end = last === "" ? size - 1 : Math.min(Number(last), size - 1);
  }

  if (start >= size || start > end) return "unsatisfiable";
  return { start, end };
}

const worker = {
  /**
   * @param {Request} request
   * @param {{ ASSETS: { fetch: (input: Request | string, init?: RequestInit) => Promise<Response> } }} env
   */
  async fetch(request, env) {
    const isRead = request.method === "GET" || request.method === "HEAD";
    const range = request.headers.get("Range");

    if (!isRead || !range) {
      // Nothing to slice: serve the file as usual, but say ranges are supported.
      const response = await env.ASSETS.fetch(request);
      if (!isRead || !response.ok) return response;
      const headers = new Headers(response.headers);
      headers.set("Accept-Ranges", "bytes");
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    // Get the complete file — without the Range or conditional headers, so
    // there is always a body — and cut the requested bytes out of it. The
    // clips are a few megabytes, so holding one in memory is fine.
    const full = await env.ASSETS.fetch(new Request(request.url, { method: "GET" }));
    if (full.status !== 200) return full;

    const buffer = await full.arrayBuffer();
    const size = buffer.byteLength;
    const etag = full.headers.get("ETag");

    const headers = new Headers({ "Accept-Ranges": "bytes" });
    for (const name of ["Content-Type", "ETag", "Cache-Control", "Last-Modified"]) {
      const value = full.headers.get(name);
      if (value) headers.set(name, value);
    }

    // If-Range: only honour the range if the file is still the one the
    // browser has part of; otherwise send it whole.
    const ifRange = request.headers.get("If-Range");
    const parsed = ifRange && ifRange !== etag ? null : parseRange(range, size);

    if (parsed === "unsatisfiable") {
      headers.set("Content-Range", `bytes */${size}`);
      return new Response(null, { status: 416, headers });
    }

    const head = request.method === "HEAD";

    if (parsed === null) {
      headers.set("Content-Length", String(size));
      return new Response(head ? null : buffer, { status: 200, headers });
    }

    const { start, end } = parsed;
    headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
    headers.set("Content-Length", String(end - start + 1));
    return new Response(head ? null : buffer.slice(start, end + 1), {
      status: 206,
      headers,
    });
  },
};

export default worker;

#!/usr/bin/env python3
"""One-time setup script: download curated royalty-free photos from Unsplash
into public/images/. Images are committed to the repo so builds never depend
on Unsplash availability. Re-run only to refresh/replace imagery.

Unsplash License: free for commercial use, no attribution required.
Credits are still recorded in public/images/CREDITS.md.
"""

import json
import os
import subprocess
import sys
import urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "images")

# file -> (search query, target width, target height or None)
TARGETS = {
    "hero-home.jpg": ("excavator construction site", 2000, 1125),
    "about-workshop.jpg": ("heavy machinery workshop repair", 1600, 1067),
    "cta-bg.jpg": ("construction crane silhouette sunset", 2000, 1000),
    "service-excavator.jpg": ("excavator bucket digging", 900, 675),
    "service-maintenance.jpg": ("mechanic heavy equipment maintenance", 900, 675),
    "service-hydraulics.jpg": ("hydraulic cylinder machinery", 900, 675),
    "service-engine.jpg": ("engine repair mechanic garage", 900, 675),
    "service-field.jpg": ("excavator working field", 900, 675),
    "service-parts.jpg": ("warehouse shelving storage racks", 900, 675),
    "equipment-excavator.jpg": ("crawler excavator yellow", 1000, 750),
    "equipment-loader.jpg": ("wheel loader machine", 1000, 750),
    "equipment-dozer.jpg": ("bulldozer", 1000, 750),
    "equipment-truck.jpg": ("mining dump truck", 1000, 750),
    "gallery-01.jpg": ("excavator digging dirt", 1200, 900),
    "gallery-02.jpg": ("construction machinery site", 1200, 900),
    "gallery-03.jpg": ("welding workshop industrial", 1200, 900),
    "gallery-04.jpg": ("mining equipment quarry", 1200, 900),
    "gallery-05.jpg": ("crane construction", 1200, 900),
    "gallery-06.jpg": ("mechanic engine tools", 1200, 900),
    "gallery-07.jpg": ("heavy equipment tracks close up", 1200, 900),
    "gallery-08.jpg": ("construction site aerial machinery", 1200, 900),
}

MIN_BYTES = 30_000


# Unsplash blocks python-urllib requests (TLS fingerprinting) but accepts curl.
def api(url: str):
    out = subprocess.run(
        ["curl", "-sf", "-m", "30", url],
        capture_output=True,
        check=True,
    ).stdout
    return json.loads(out)


def download(url: str, dest: str) -> bool:
    try:
        subprocess.run(
            ["curl", "-sfL", "--retry", "2", "-m", "120", "-o", dest, url],
            check=True,
        )
        if os.path.getsize(dest) < MIN_BYTES:
            os.remove(dest)
            return False
        return True
    except Exception as e:
        print(f"    download failed: {e}", flush=True)
        if os.path.exists(dest):
            os.remove(dest)
        return False


def main():
    os.makedirs(OUT, exist_ok=True)
    used_ids: set[str] = set()
    credits: list[str] = []
    failures: list[str] = []

    for fname, (query, w, h) in TARGETS.items():
        dest = os.path.join(OUT, fname)
        if os.path.exists(dest) and os.path.getsize(dest) >= MIN_BYTES:
            print(f"[skip] {fname} already present", flush=True)
            continue
        print(f"[get ] {fname}  <- '{query}'", flush=True)
        q = urllib.parse.quote(query)
        try:
            data = api(
                "https://unsplash.com/napi/search/photos"
                f"?query={q}&per_page=12&orientation=landscape"
            )
        except Exception as e:
            print(f"    search failed: {e}", flush=True)
            failures.append(fname)
            continue

        ok = False
        for res in data.get("results", []):
            pid = res["id"]
            if pid in used_ids or res.get("premium"):
                continue
            raw = res["urls"]["raw"]
            size = f"&w={w}&h={h}&fit=crop" if h else f"&w={w}&fit=max"
            url = f"{raw}&q=78&auto=format&fm=jpg{size}"
            if download(url, dest):
                used_ids.add(pid)
                author = res.get("user", {}).get("name", "unknown")
                link = res.get("links", {}).get("html", "")
                credits.append(f"- `{fname}` — {author} — {link}")
                print(f"    ok: {pid} by {author}", flush=True)
                ok = True
                break
        if not ok:
            failures.append(fname)
            print(f"    FAILED all candidates for {fname}", flush=True)

    with open(os.path.join(OUT, "CREDITS.md"), "a", encoding="utf-8") as f:
        f.write("\n".join(credits) + "\n")

    print("\nDone.", flush=True)
    if failures:
        print("FAILURES: " + ", ".join(failures), flush=True)
        sys.exit(1)
    print("All images downloaded.", flush=True)


if __name__ == "__main__":
    main()

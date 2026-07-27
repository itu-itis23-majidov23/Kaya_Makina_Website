// Static fallback for the root URL. In production Cloudflare Pages issues a
// real 302 via public/_redirects before this page is ever served; this
// meta-refresh document covers local previews and any host without redirects.
export default function RootPage() {
  return (
    <html lang="az">
      <head>
        <meta httpEquiv="refresh" content="0; url=/az/" />
        <title>Kaya Makina</title>
        <meta name="robots" content="noindex" />
      </head>
      <body>
        <p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- intentional plain link in the no-JS fallback document */}
          <a href="/az/">Kaya Makina</a>
        </p>
      </body>
    </html>
  );
}

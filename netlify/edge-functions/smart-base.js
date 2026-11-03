// The SMART trains app (proxied at /smart/ in netlify.toml) loads its data and
// icons by relative path, so they only resolve if the page is at /smart/. Netlify
// normalises trailing slashes before redirect rules and edge functions see the
// path, so a bare /smart can't reliably be redirected. Instead, give the app's
// HTML a <base href="/smart/"> so relative paths resolve the same either way.
const BASE = '<base href="/smart/">';

export default async (request, context) => {
  const url = new URL(request.url);
  // Add the slash when the path really arrives without it, so the URL is tidy.
  if (url.pathname === '/smart') {
    url.pathname = '/smart/';
    return Response.redirect(url, 302);
  }
  const response = await context.next();
  if (!(response.headers.get('content-type') || '').includes('text/html')) return response;
  const html = await response.text();
  if (html.includes('<base ')) return new Response(html, response);
  const headers = new Headers(response.headers);
  // The body is re-encoded, so the upstream length, encoding and ETag no longer apply.
  for (const h of ['content-length', 'content-encoding', 'etag']) headers.delete(h);
  return new Response(html.replace(/<head[^>]*>/i, (m) => m + BASE), {
    status: response.status, statusText: response.statusText, headers,
  });
};

export const config = { path: ['/smart', '/smart/*'] };

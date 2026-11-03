// The SMART trains app (proxied at /smart/ in netlify.toml) loads its assets by
// relative path, so a bare /smart has to gain a trailing slash. A redirect rule
// can't do this: Netlify matches rules with or without the slash, so the rule
// also caught /smart/ and looped. Edge functions see the exact path instead.
export default (request, context) => {
  const url = new URL(request.url);
  if (url.pathname !== '/smart') return context.next();
  url.pathname = '/smart/';
  // 302 rather than 301 so browsers don't cache it if it ever needs changing.
  return Response.redirect(url, 302);
};

export const config = { path: '/smart' };

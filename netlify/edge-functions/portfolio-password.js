// Keeps /portfolio behind a browser password prompt until it goes public.
// Any username works; only the password is checked.
const PASSWORD = 'wordpass';

export default async (request, context) => {
  const [scheme, encoded] = (request.headers.get('authorization') || '').split(' ');
  if (scheme === 'Basic' && encoded) {
    const credentials = atob(encoded);
    if (credentials.slice(credentials.indexOf(':') + 1) === PASSWORD) return context.next();
  }
  return new Response('Password required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Portfolio", charset="UTF-8"',
      'Cache-Control': 'no-store',
    },
  });
};

export const config = { path: ['/portfolio', '/portfolio.html', '/portfolio/*'] };

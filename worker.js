import { handleAuthorize } from './handlers/authorize.js';
import { handleCallback } from './handlers/callback.js';
import { handleQuoteRequest } from './handlers/quote.js';
import { handleLandingPage } from './handlers/landing.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const clientId = env.SCHWAB_APP_KEY;
    const clientSecret = env.SCHWAB_APP_SECRET;
    const redirectUri = `${url.origin}/callback`;

    const authorizationEndpoint = 'https://api.schwabapi.com/v1/oauth/authorize';
    const tokenEndpoint = 'https://api.schwabapi.com/v1/oauth/token';

    // --- Router ---
    if (url.pathname === '/' || url.pathname === '') {
      return handleLandingPage();
    } else if (url.pathname === '/authorize') {
      return handleAuthorize(authorizationEndpoint, clientId, redirectUri);
    } else if (url.pathname === '/callback') {
      return handleCallback(request, tokenEndpoint, clientId, clientSecret, redirectUri, env);
    } else if (url.pathname === '/quote') {
      // Example: /quote?symbol=TSLA
      const symbol = url.searchParams.get('symbol');
      if (!symbol) {
        return new Response('Error: Missing symbol parameter.', { status: 400 });
      }
      return handleQuoteRequest(symbol, env);
    } else {
      return new Response('Not Found.', { status: 404 });
    }
  },
};
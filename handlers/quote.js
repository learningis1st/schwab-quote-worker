import { refreshToken } from './refreshToken.js';

async function fetchQuote(symbol, accessToken, env) {
  const quoteEndpoint = `https://api.schwabapi.com/marketdata/v1/${symbol}/quotes`;

  const response = await fetch(quoteEndpoint, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
      'Schwab-Client-CorrelId': crypto.randomUUID(),
    },
  });

  if (!response.ok) {
    const [responseClone1, responseClone2] = response.clone().body.tee();
    console.error('Quote API Error:', response.status, await new Response(responseClone1).text());
    throw new Error(`Quote API request failed: ${response.status} - ${await new Response(responseClone2).text()}`);
  }

  const data = await response.json();
  return data;
}

export async function handleQuoteRequest(symbol, env) {
  try {
    let accessToken = await env.SCHWAB_TOKENS.get('access_token');

    if (!accessToken) {
      // Try to refresh token if no access token exists
      try {
        accessToken = await refreshToken(env);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return new Response("Error: No access token found and refresh failed. Please authorize first.", { status: 401 });
      }
    }

    try {
      const quoteData = await fetchQuote(symbol, accessToken, env);
      return new Response(JSON.stringify(quoteData, null, 2), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (quoteError) {
      // If the quote fails with the current token, try refreshing and retrying.
      if (quoteError.message.includes('401') || quoteError.message.includes('403')) {
        console.log("Access token expired. Refreshing and retrying.");
        try {
          accessToken = await refreshToken(env);
          const quoteData = await fetchQuote(symbol, accessToken, env);
          return new Response(JSON.stringify(quoteData, null, 2), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (refreshRetryError) {
          console.error("Token refresh and retry failed:", refreshRetryError);
          return new Response(`Error: Token refresh failed after quote attempt: ${refreshRetryError.message}`, { status: 500 });
        }
      }
      throw quoteError;
    }

  } catch (error) {
    console.error("Error fetching quote:", error);
    return new Response(`Error fetching quote: ${error.message}`, { status: 500 });
  }
}
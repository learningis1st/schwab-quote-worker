# Cloudflare Worker for Schwab Market Data API

This Cloudflare Worker provides a simple way to fetch market data from the Schwab API. It includes endpoints for:

* **Authorization**: Initiates the OAuth 2.0 authorization flow with Schwab.
* **Callback**: Handles the OAuth 2.0 callback from Schwab, exchanges the authorization code for tokens, and securely stores them.
* **Quote**: Fetches real-time quote data for a given stock symbol.

## Prerequisites

* **Schwab Developer Account and API App**: You need to have a Schwab Developer account and have created an API application to get your `SCHWAB_APP_KEY` and `SCHWAB_APP_SECRET`.
* **Cloudflare Account**: You need a Cloudflare account to deploy this worker.
* **Cloudflare Workers KV Namespace**: You need to create a Cloudflare Workers KV namespace to store the OAuth tokens securely.

## Usage

1. **Authorize**: To start the OAuth flow, access the `/authorize` endpoint of your worker's URL. This will redirect you to Schwab for authorization:
    ```
    https://your-worker-subdomain.workers.dev/authorize
    ```
   
2. **Callback**: After authorizing with Schwab, you'll be redirected back to your worker's `/callback` endpoint. This endpoint will handle the token exchange and store the tokens in your KV namespace. You should see an "Authentication Successful!" message.


3. **Get a Quote**: To get a quote for a stock symbol, use the `/quote` endpoint with the `symbol` query parameter:
    ```
    https://your-worker-subdomain.workers.dev/quote?symbol=TSLA
    ```
    This will return a JSON response with the quote data for TSLA.
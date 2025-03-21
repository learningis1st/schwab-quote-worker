export function handleLandingPage() {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Market Data API</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #2c3e50;
        }
        .container {
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        code {
            background-color: #f1f1f1;
            padding: 2px 5px;
            border-radius: 3px;
            font-family: monospace;
        }
        .btn {
            display: inline-block;
            padding: 10px 15px;
            background-color: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin-right: 10px;
        }
        .btn:hover {
            background-color: #2980b9;
        }
        footer {
            margin-top: 30px;
            text-align: center;
            font-size: 0.9em;
            color: #7f8c8d;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Market Data API</h1>

        <div class="section">
            <h2>Welcome</h2>
            <p>
                This service provides access to financial data from Schwab API,
                allowing you to fetch real-time stock quotes.
            </p>
        </div>

        <div class="section">
            <h2>How to Use</h2>
            <p>
                Fetch quotes using:
                <br>
                <code>GET /quote?symbol=AAPL</code> (Replace AAPL with desired symbol)
            </p>
        </div>

        <div class="section">
            <h2>Quick Actions</h2>
            <p>
                <a href="/quote?symbol=AAPL" class="btn">Sample Quote (AAPL)</a>
            </p>
        </div>
    </div>

    <footer>
        &copy; ${new Date().getFullYear()} learningis1st
    </footer>
</body>
</html>`;

    return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
        status: 200
    });
}
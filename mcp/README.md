# Hostinger MCP setup

## Option A — Official npm package (recommended by Hostinger)

Uses [`hostinger-api-mcp`](https://www.npmjs.com/package/hostinger-api-mcp) from npm. Environment variable: **`API_TOKEN`**.

1. **Revoke any token that was ever pasted into chat, email, or a repo** and create a new token in [hPanel](https://hpanel.hostinger.com).
2. Copy [`hostinger-official-mcp.example.json`](hostinger-official-mcp.example.json) into your **user** Cursor MCP config (not this repo), e.g. macOS: `~/.cursor/mcp.json`, and replace the placeholder with your new token.
3. Restart Cursor.

Do **not** commit a real token. Keep `mcp.json` only on your machine or use Cursor’s secret storage if available.

**Node:** the official package readme recommends **Node 24+**. If `npx` fails, install Node 24 or use `nvm install 24`.

## Option B — Local server in this repo

See [`hostinger-mcp/README.md`](hostinger-mcp/README.md) for the custom `mcp/hostinger-mcp` server (uses `HOSTINGER_API_TOKEN`).

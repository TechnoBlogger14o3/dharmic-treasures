# Hostinger MCP

Model Context Protocol (MCP) server that calls the [Hostinger API](https://developers.hostinger.com/) using a **Bearer token** from your Hostinger account.

This does **not** deploy your site by itself: it lets Cursor (or another MCP client) run API operations you choose (DNS, billing catalog, VPS, etc.—whatever your token allows).

## Prerequisites

1. **API token** — create one in Hostinger (hPanel → Account → API, or follow current Hostinger docs).
2. **Node.js 18+**

## Install

```bash
cd mcp/hostinger-mcp
npm install
npm run build
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `HOSTINGER_API_TOKEN` | **Yes** | Bearer token for the API |
| `HOSTINGER_API_BASE_URL` | No | Default: `https://developers.hostinger.com` |
| `HOSTINGER_WHOAMI_PATH` | No | GET path for `hostinger_whoami` (default: `/api/billing/v1/catalog`) |

Never commit your token. Prefer OS keychain or your MCP client’s `env` block.

## Tools

- **`hostinger_request`** — `GET` / `POST` / `PUT` / `PATCH` / `DELETE` with a path (e.g. `/api/billing/v1/catalog`) and optional JSON body.
- **`hostinger_whoami`** — quick check that the token and base URL work (uses `HOSTINGER_WHOAMI_PATH`).

## Cursor: add MCP server

In **Cursor Settings → MCP → Add new global MCP server**, or edit your MCP config file and add:

```json
{
  "mcpServers": {
    "hostinger": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/DharmicTreasures/mcp/hostinger-mcp/dist/index.js"],
      "env": {
        "HOSTINGER_API_TOKEN": "YOUR_TOKEN_HERE"
      }
    }
  }
}
```

After changing code, run `npm run build` again so `dist/index.js` is up to date.

## Hosting this project (Dharmic Treasures) on Hostinger

Typical flow for a **static Vite build**:

1. Run `npm run build` in the project root (outputs `dist/`).
2. In Hostinger **File Manager** or FTP, upload the **contents** of `dist/` to your site’s `public_html` (or the subdomain folder).
3. Ensure `index.html` is at the web root and asset paths match your deploy URL (Vite `base` in `vite.config` if the app is not at `/`).

Use the Hostinger API via this MCP only for steps Hostinger exposes (DNS zones, VPS, etc.); static upload is often done in hPanel, not the API.

## References

- [Hostinger API reference](https://developers.hostinger.com/)
- [Hostinger API SDKs (official)](https://www.hostinger.com/support/11080244-introduction-to-hostinger-api-sdks/)

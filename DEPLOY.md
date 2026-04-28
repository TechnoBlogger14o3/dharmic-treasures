# Deploy Dharmic Treasures (Hostinger + GitHub Actions)

## 1. Automated deploy (recommended)

Workflow: [`.github/workflows/deploy-hostinger.yml`](.github/workflows/deploy-hostinger.yml)

On every push to `main`, GitHub Actions runs `npm ci`, `npm run build`, and uploads **`dist/`** to your Hostinger account over **FTP**.

### GitHub repository secrets

In the repo: **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Description |
|--------|-------------|
| `HOSTINGER_FTP_HOST` | FTP hostname (often `ftp.hostinger.com` — confirm in hPanel → **Files → FTP Accounts**) |
| `HOSTINGER_FTP_USER` | FTP username |
| `HOSTINGER_FTP_PASSWORD` | FTP password |

### FTP remote folder

The workflow uses `server-dir: /public_html/`. If your FTP user opens **above** `public_html`, you may need to change `server-dir` in the workflow (e.g. `/domains/dharmic-treasures.com/public_html/`). Check in FileZilla or hPanel where `index.html` lives.

### FTPS vs FTP

If the action fails with TLS errors, open the workflow and add to the FTP deploy step `with:` (see [FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action)):

```yaml
protocol: ftps
```

### After setup

Push to `main` or run **Actions → Deploy to Hostinger → Run workflow**.

---

## 2. Hostinger MCP vs automation

| Tool | What it does |
|------|----------------|
| **GitHub Actions + FTP** | Builds and **uploads static files** to `public_html`. This is what “deploy the website” means for shared hosting. |
| **Hostinger MCP** (Cursor) | Talks to the **Hostinger API** (VPS, billing, DNS where exposed, etc.). It does **not** upload files to shared hosting. |

Use MCP in Cursor for API tasks; use this workflow (or manual upload) for **site files**.

See [`mcp/README.md`](mcp/README.md).

---

## 3. Manual upload (no CI)

```bash
npm ci
npm run build
```

Upload everything inside **`dist/`** to `public_html` (see main project README / Hostinger docs).


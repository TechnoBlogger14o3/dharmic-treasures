# Deploy Dharmic Treasures (Hostinger + GitHub Actions)

## 1. Automated deploy (recommended)

Workflow: [`.github/workflows/deploy-hostinger.yml`](.github/workflows/deploy-hostinger.yml)

On every push to `main`, GitHub Actions runs `npm ci`, builds the RAG index (`npm run index:rag`), `npm run build`, and uploads **`dist/`** to Hostinger over **FTP**.

The chat Worker is already deployed at `https://shastra-chat.dharmic-treasures.workers.dev`. The frontend uses that URL unless `VITE_CHAT_URL` is set at build time. `GROQ_API_KEY` lives only on Cloudflare (`wrangler secret put GROQ_API_KEY`). Never put it in Vite or GitHub frontend env.

### GitHub repository secrets

In the repo: **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Description |
|--------|-------------|
| `HOSTINGER_FTP_HOST` | FTP hostname (often `ftp.hostinger.com` — confirm in hPanel → **Files → FTP Accounts**) |
| `HOSTINGER_FTP_USER` | FTP username |
| `HOSTINGER_FTP_PASSWORD` | FTP password |
| `VITE_CHAT_URL` | Optional. Worker URL, e.g. `https://shastra-chat.dharmic-treasures.workers.dev`. If unset, the app uses that URL anyway. |

### Chat Worker (Cloudflare)

Deployed from `workers/shastra-chat`:

```bash
cd workers/shastra-chat
npx wrangler secret put GROQ_API_KEY
npx wrangler deploy
```

After Worker code changes, run `npx wrangler deploy` again. Hostinger FTP does not update the Worker.

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

Use MCP in Cursor for API tasks (configure it in your local `~/.cursor/mcp.json`); use this workflow (or manual upload) for **site files**.

---

## 3. Manual upload (no CI)

```bash
npm ci
npm run build
```

Upload everything inside **`dist/`** to `public_html` (see main project README / Hostinger docs).

Shastra PDFs must be in **`public/pdfs/`** and committed. `data/*.pdf` stays local/gitignored; GitHub Actions cannot copy files that are not in the repo. A missing PDF URL returns the homepage HTML, so the viewer fails. `ramayana.pdf` is ~81MB.


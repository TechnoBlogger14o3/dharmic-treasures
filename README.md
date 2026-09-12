# धर्मिक खजाना · Dharmic Treasures

Read Hindu scriptures and pilgrimage guides in the browser. Live: [dharmic-treasures.com](https://dharmic-treasures.com).

React 18 + TypeScript + Vite + Tailwind. Static hosting on Hostinger (GitHub Actions FTP). Optional Tauri desktop build.

## What’s in the app

**Texts** (Sanskrit, Hindi, English)

- Bhagavad Gita (18 chapters)
- Hanuman Chalisa, Sunderkand, Bajrang Baan
- Yaksha Prashna
- Satyanarayan Vrat Katha

**Places and observances**

- 51 Shaktipeeths, Char Dham, 12 Jyotirlingas (maps where listed)
- Chhath Puja — vidhi, katha vs history, Kartik dates for the upcoming year
- Diwali — five days, Lakshmi Puja notes, katha vs history, North India dates through 2027

**Shastras (PDFs)**

- Sadhak Sanjeevani (Gita), Shiv Puran, Vishnu Puran, Valmiki Ramayan  
- Opened in the in-app PDF viewer. Files live in `public/pdfs/` and must be committed so deploy can serve them. Source copies under `data/*.pdf` stay local and gitignored.

**Also**

- Bottom-left panchang (city sunrise: tithi, nakshatra, yoga, karana, vara, rahu kaal, main festival)
- Theme picker in the header
- Chat button is **Coming Next** (not a live Q&A)

Reading progress and settings use `localStorage`.

## Run locally

```bash
npm install
npm run dev
```

App: [http://localhost:5173](http://localhost:5173)

```bash
npm test          # Chhath dates, panchang
npm run build     # tsc + Vite
```

## Deploy

See [DEPLOY.md](DEPLOY.md). Push to `main` runs the Hostinger FTP workflow.

Put the four PDFs in `public/pdfs/` before that build. If they are missing, PDF URLs return the homepage HTML and the viewer fails.

## Repo layout

```
data/                 # verse JSON/TS and local source PDFs (PDFs gitignored)
public/pdfs/          # PDFs the site actually serves
src/components/       # readers, maps, PDF viewer, Chhath, panchang
src/utils/            # Chhath calendar table, panchang tithi
.github/workflows/    # Hostinger deploy
```

## License

Personal project. Texts and PDFs follow their original publishers’ terms (e.g. Gita Press editions).

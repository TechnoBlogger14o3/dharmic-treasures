# Temple-page UI restyle

Date: 2026-09-09

## Goal

Give Dharmic Treasures a puja-book look: saffron header, cream manuscript pages, gold edges, Devanagari serif for Hindi. Same screens, routes, and data. No new features.

## Out of scope

- New illustrations or generated art
- Audio, dark “night temple” mode
- Changing Leaflet map internals or PDF.js internals
- Chatbot work
- Layout/routing changes

## Visual language

| Token | Value | Use |
|---|---|---|
| Cream | `#FBF6EA` | Page background, cards |
| Saffron | `#C45C26` | Header bar, primary buttons, active tab fill |
| Maroon | `#6B2B1F` | Hindi titles |
| Gold | `#C9A227` | Thin borders, active tab underline, card edge |
| Ink | `#3B2A1A` | Body text (not pure black) |

**Type**

- Hindi / Devanagari: `Tiro Devanagari Hindi`, fallback `Noto Serif Devanagari`, then serif
- English / UI chrome: keep Inter (or similar sans)
- Load fonts from Google Fonts in `index.html`
- Tailwind: `font-serif` for Devanagari titles and Katha/verse body; `font-sans` for English labels

**Motifs**

- One small ॐ (or simple lotus) in the header only
- Chapter cards: gold hairline + optional corner flourish via CSS (no image sprites)
- Faint paper grain on the page via CSS (`background-image` repeating noise or a very light radial wash), not a heavy photo

## Default theme and picker

Rename / retune `gradient-1` as the sacred default: cream page with a warm saffron wash at the edges (not the current pale amber-50).

Keep five picker options. Relabel to match the look (e.g. Saffron, Cool, Nature, Rose, Neutral). Existing `localStorage` theme keys stay (`gradient-1` … `gradient-5`) so saved settings still apply.

If the user has never set a theme, default remains `gradient-1` (now cream/saffron).

## Surfaces

**Header** (`App.tsx`): saffron bar, cream/white tab pills, gold underline + saffron fill on the selected text type. Unselected tabs: cream with gold hairline. Theme picker control stays top-right; restyle its chrome to cream/gold, not generic gray.

**Chapter list** (`ChapterList.tsx`): cream “leaf” cards, gold edge, maroon Hindi title in serif, saffron chapter number. Satyanarayan stays Hindi-only (no English title, no verse count).

**Chapter reader** (`ChapterView.tsx`): cream folio card, serif for Sanskrit/Hindi, ink body. Previous/Next: saffron buttons, gold hover. Gita background image can stay; overlay should not fight the cream folio.

**Satyanarayan** (`SatyanarayanChapterView.tsx`): same folio; Hindi body in serif; पिछला / अगला saffron.

**Footer** (`App.tsx`): cream strip, maroon or saffron small-caps line, gold hairline. Link pills: cream + gold border.

**Shared buttons** (bookmark/share/export, font size, background selector): amber-500 → saffron; gray borders → gold/cream. Do not redesign their behavior.

## Files to touch

- `index.html` — font links
- `src/index.css` — paper grain, serif utility, optional lotus-corner class
- `tailwind.config.js` — colors (`saffron`, `cream`, `maroon`, `gold`, `ink`) and `fontFamily.serif`
- `src/App.tsx` — header, footer, default background class
- `src/components/ChapterList.tsx`
- `src/components/ChapterView.tsx`
- `src/components/SatyanarayanChapterView.tsx`
- `src/components/BackgroundSelector.tsx` — labels + chrome
- Light pass on `LoadingSpinner.tsx` and pilgrimage views’ outer wrappers if they use hard-coded gray/white that clashes; do not restyle map/chart internals

## Errors and a11y

- Contrast: maroon on cream and white on saffron must stay readable (WCAG AA for body and buttons)
- Do not rely on gold-only to mark the active tab; keep fill + underline
- Motifs are decorative (`aria-hidden`)

## Verification

In the browser:

1. Home: saffron header, cream page, gold-edged chapter cards, Hindi serif titles
2. Switch text types: active tab is obvious
3. Open a Gita verse: cream folio, serif Hindi/Sanskrit, saffron Previous/Next
4. Open Satyanarayan अध्याय: Hindi-only folio, no Transliteration/Meaning
5. Theme picker still changes the page wash
6. Shaktipeeths / Char Dham / Jyotirlingas still load; maps still pan
7. Mobile: header tabs still scroll; 44px tap targets remain

## Success

The app reads as a sacred book in the browser, without new pages or broken existing flows.

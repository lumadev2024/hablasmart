# HablaSmart — Blog Astro

Blog personale su comunicazione comportamentale, marketing, psicologia della persuasione e AI applicata ai contenuti.

**Stack:** [Astro](https://astro.build) · Content Collections · Vanilla CSS · Vercel

---

## Struttura del progetto

```
hablas mart/
├── public/
│   ├── favicon.svg
│   ├── og-image.jpg          ← aggiungi un'immagine 1200×630px
│   └── robots.txt
│
├── src/
│   ├── content/
│   │   ├── config.ts         ← schema TypeScript delle collezioni
│   │   └── blog/
│   │       ├── primo-articolo.md
│   │       └── ...           ← aggiungi qui i tuoi articoli
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro  ← layout base con <head> SEO
│   │   └── PostLayout.astro  ← layout singolo articolo
│   │
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── PostCard.astro    ← card riutilizzabile
│   │
│   ├── pages/
│   │   ├── index.astro       ← homepage
│   │   ├── 404.astro
│   │   ├── rss.xml.ts        ← feed RSS automatico
│   │   └── articoli/
│   │       ├── index.astro   ← archivio articoli + filtri
│   │       └── [slug].astro  ← pagina singolo articolo (dinamica)
│   │
│   ├── styles/
│   │   └── global.css        ← design system completo
│   │
│   └── utils/
│       └── readingTime.ts    ← calcolo minuti di lettura
│
├── astro.config.mjs
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## Come scrivere un articolo

Crea un file `.md` in `src/content/blog/`:

```
src/content/blog/il-mio-articolo.md
```

Il nome del file diventa lo **slug URL**: `/articoli/il-mio-articolo/`

### Frontmatter obbligatorio

```yaml
---
title: "Titolo dell'articolo"
description: "Descrizione breve per SEO e card (max 160 caratteri)"
pubDate: 2024-03-15
category: "Marketing"       # Comunicazione | Marketing | Persuasione | AI & Contenuti
tags: ["bias", "psicologia"]
heroImage: ""               # lascia vuoto per il CSS art placeholder
heroImageAlt: ""
author: "HablaSmart"
featured: false             # true = compare in homepage
draft: false                # true = non incluso nel build
---

Il tuo contenuto in Markdown qui...
```

### Categorie disponibili

| Valore nel frontmatter | Filtro URL |
|---|---|
| `Comunicazione` | `/articoli/?categoria=Comunicazione` |
| `Marketing` | `/articoli/?categoria=Marketing` |
| `Persuasione` | `/articoli/?categoria=Persuasione` |
| `AI & Contenuti` | `/articoli/?categoria=AI+%26+Contenuti` |

---

## Comandi

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo (http://localhost:4321)
npm run dev

# Build di produzione
npm run build

# Anteprima build locale
npm run preview
```

---

## Deploy su Vercel

### Metodo 1 — Deploy automatico (consigliato)

1. Crea un repo su GitHub e fai push del progetto
2. Vai su [vercel.com](https://vercel.com) → **Add New Project**
3. Importa il repo GitHub
4. Vercel rileva Astro automaticamente — clicca **Deploy**
5. Ogni `git push` su `main` fa deploy automatico ✅

### Metodo 2 — Vercel CLI

```bash
npm i -g vercel
vercel
```

### Aggiornare il dominio

1. Dopo il primo deploy, copia l'URL Vercel (es. `hablas mart.vercel.app`)
2. Aggiorna `site` in `astro.config.mjs`:
   ```js
   site: 'https://hablasmart.vercel.app',
   ```
3. Aggiorna `robots.txt` con il tuo URL reale
4. Se hai un dominio custom, aggiungilo in Vercel → Settings → Domains

---

## Personalizzazione

### Aggiungere una categoria

Nel file `src/content/config.ts`, aggiungi il valore all'enum:

```ts
category: z.enum([
  'Comunicazione',
  'Marketing',
  'Persuasione',
  'AI & Contenuti',
  'Nuova Categoria', // ← aggiungi qui
]),
```

### Cambiare i colori

Tutte le variabili CSS sono in `src/styles/global.css` → sezione `:root`.

### Newsletter

Il form attualmente simula l'invio. Per integrarlo con un vero provider:

- **Mailchimp**: sostituisci il `setTimeout` con una fetch all'API di Mailchimp
- **ConvertKit**: usa le loro API Forms
- **Buttondown / Substack**: reindirizza il form all'URL di iscrizione

---

## SEO incluso

- ✅ Meta title e description dinamici
- ✅ Open Graph e Twitter Card
- ✅ Schema JSON-LD (WebSite, Blog, BlogPosting)
- ✅ Sitemap automatica (`@astrojs/sitemap`)
- ✅ Feed RSS (`/rss.xml`)
- ✅ `robots.txt`
- ✅ Canonical URL
- ✅ `lang="it"` nella tag `<html>`
- ✅ Attributi `alt` su tutte le immagini
- ✅ Struttura H1→H2→H3 semantica
- ✅ Tempi di lettura stimati

# Prima Clean — Landing page

React 18 · Tailwind CSS 4 · Motion (Framer Motion) · Vite.

```bash
npm install
npm run dev      # sviluppo
npm run build    # produzione in dist/
```

## Aggiornare i contenuti
Tutto è in `src/content.js`: sedi, telefoni, orari, servizi, promozioni, fotografie.
Numero di sedi, testi che le elencano, metadati SEO e dati strutturati (JSON-LD, generati in
build da `vite.config.js`) si aggiornano automaticamente dall'elenco `stores`.

- **Foto**: copiare i file in `public/images/` e indicarne il percorso in `photos`
  (es. `hero: '/images/hero.jpg'`). Finché il valore è `null` viene mostrato lo
  studio materico generativo (seta animata su canvas / trame SVG).
- **Orari**: `hours: [['Lunedì–Sabato', '09:00–19:30']]`. Con `hoursVerified: false` vengono
  mostrati come "indicativi, da confermare" e non finiscono nei dati strutturati.
- **Sede provvisoria (Cologna Veneta)**: `provisional: true` mostra "Nuova sede · operatività in
  verifica"; `phoneVerified: false` segna il numero come da verificare e lo esclude dalla barra di
  chiamata rapida e dai contatti delle promo. Dopo la verifica impostare `provisional: false`,
  `phoneVerified: true`, `hoursVerified: true`. Per nasconderla del tutto: `enabled: false`.
- **Promozioni**: `active: false` per nasconderle; `price: null` mostra "Prezzo in negozio".

## Da verificare prima della pubblicazione
- [ ] Orari dei tre negozi (Bovolone: orari della domenica)
- [ ] Cologna Veneta: operatività della sede, telefono 392 260 7066, orari Lun–Sab 09:00–19:30, apertura domenicale
- [ ] Civico di Via Madonna, Bovolone (266?) — oggi non mostrato
- [ ] Disponibilità di ogni servizio per sede
- [ ] Prezzo promo camicie (storico €2,00 — non pubblicato)
- [ ] P.IVA, sede legale, privacy e cookie policy (footer)
- [ ] Dominio definitivo (`canonical` e JSON-LD in `index.html`)
- [ ] Fotografie reali (negozio, capi, tessuti)

## Note tecniche
- `prefers-reduced-motion`: animazioni disattivate (MotionConfig + CSS), la seta si ferma su un fotogramma.
- Il canvas della seta gira a ~180px di larghezza e viene scalato dal browser: costo minimo,
  si mette in pausa fuori viewport e con la scheda in background.
- SEO locale: title/description con le città, JSON-LD `DryCleaningOrLaundry` per ogni sede, Open Graph.

## Pubblicazione su GitHub Pages
1. Crea un repository su GitHub e carica il progetto sul branch `main`.
2. Nel repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Ogni push su `main` avvia `.github/workflows/deploy.yml`, che compila e pubblica il sito
   (anche avviabile a mano da **Actions → Deploy su GitHub Pages → Run workflow**).

Il sito usa percorsi relativi (`base: './'` in `vite.config.js`), quindi funziona sia su
`utente.github.io/nome-repo/` sia con un dominio personalizzato.

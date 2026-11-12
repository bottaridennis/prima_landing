import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { activeStores, brand, listJoin, localities, StoreCountWord } from './src/content.js'

const SITE_URL = 'https://dennisbottari.it/prima_landing/'

// Giorni in schema.org per gli orari (usati solo se verificati)
const DAYS = {
  lunedì: 'Monday', martedì: 'Tuesday', mercoledì: 'Wednesday', giovedì: 'Thursday',
  venerdì: 'Friday', sabato: 'Saturday', domenica: 'Sunday',
}
const ORDER = Object.values(DAYS)
function hoursToSchema(hours) {
  const out = []
  for (const [days, range] of hours) {
    const [from, to] = days.toLowerCase().split(/[–-]/).map((d) => DAYS[d.trim()])
    const [opens, closes] = range.split(/[–-]/).map((t) => t.trim())
    if (!from || !opens || !closes) continue
    const i0 = ORDER.indexOf(from)
    const i1 = to ? ORDER.indexOf(to) : i0
    out.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: ORDER.slice(i0, i1 + 1), opens, closes })
  }
  return out
}

function jsonLd() {
  const org = {
    '@type': 'Organization',
    '@id': `${SITE_URL}#org`,
    name: brand.name,
    legalName: brand.legalName,
    email: brand.email,
    url: SITE_URL,
  }
  const shops = activeStores
    // le sedi provvisorie compaiono solo con l'indirizzo (nessun recapito o orario)
    .map((s) => {
      const node = {
        '@type': 'DryCleaningOrLaundry',
        name: `${brand.name} — ${s.name}`,
        parentOrganization: { '@id': `${SITE_URL}#org` },
        email: brand.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: s.schema.streetAddress,
          addressLocality: s.schema.locality,
          ...(s.schema.postalCode ? { postalCode: s.schema.postalCode } : {}),
          addressRegion: 'VR',
          addressCountry: 'IT',
        },
        areaServed: s.schema.areaServed,
      }
      if (s.phoneVerified !== false && !s.provisional) node.telephone = `+39 ${s.phone}`
      if (s.hours && s.hoursVerified !== false && !s.provisional) node.openingHoursSpecification = hoursToSchema(s.hours)
      return node
    })
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [org, ...shops] }, null, 2)
}

/** Inserisce in index.html i dati delle sedi presi da src/content.js. */
function storesSeo() {
  return {
    name: 'stores-seo',
    transformIndexHtml(html) {
      const names = listJoin(activeStores.map((s) => s.name))
      const places = listJoin(
        activeStores.map((s) => (s.name === s.schema.locality ? s.name : `${s.schema.locality} (${s.name})`))
      )
      return html
        .replaceAll('%STORE_NAMES%', names)
        .replaceAll('%STORE_PLACES%', places)
        .replaceAll('%STORE_COUNT_WORD%', StoreCountWord)
        .replaceAll('%LOCALITIES_COMMA%', localities.join(', '))
        .replace('<!--%JSON_LD%-->', `<script type="application/ld+json">\n${jsonLd()}\n    </script>`)
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), storesSeo()],
})

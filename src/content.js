/**
 * CONTENUTI DEL SITO — unico file da modificare per aggiornare testi,
 * sedi, servizi, promozioni e fotografie.
 *
 * Regola editoriale: pubblicare solo informazioni verificate.
 * I campi marcati `verified: false` vengono mostrati con la dicitura
 * "da confermare in negozio" oppure non vengono mostrati.
 */

export const brand = {
  name: 'Prima Clean',
  legalName: 'Prima Clean di Mattiolo Sonia',
  email: 'lavasecco1aclean@gmail.com',
  // TODO legale: inserire P.IVA, sede legale, link privacy e cookie policy.
  vat: null,
}

/**
 * FOTOGRAFIE
 * Inserire i file in /public/images e indicare qui il percorso
 * (es. '/images/hero.jpg'). Se il valore è null viene mostrato lo
 * "studio materico" generativo coordinato con la palette.
 */
export const photos = {
  hero: null,
  intro: null,
  services: {
    secco: null,
    acqua: null,
    delicati: null,
    tappeti: null,
    restauro: null,
    impermeabilizzazione: null,
    ozono: null,
    sottovuoto: null,
    espresso: null,
  },
}

/**
 * SEDI
 * - `enabled: false` nasconde la sede ovunque (sito, mappa, footer, SEO).
 * - `provisional: true` mostra la sede con la dicitura "operatività in verifica".
 * - `phoneVerified: false` mostra il numero come "da verificare" e lo esclude
 *   dalla barra di chiamata rapida, dai contatti promo e dai dati strutturati.
 * - `hoursVerified: false` mostra gli orari come "indicativi, da confermare"
 *   e non li inserisce nei dati strutturati.
 * Per attivare definitivamente Cologna Veneta: provisional → false,
 * phoneVerified → true, hoursVerified → true (dopo verifica diretta).
 */
export const stores = [
  {
    id: 'verona-uno',
    enabled: true,
    name: 'Verona Uno',
    place: 'Centro Commerciale Verona Uno',
    street: 'Via Monte Cristallo 1',
    city: 'San Giovanni Lupatoto (VR)',
    hint: 'All’interno della galleria del centro commerciale',
    phone: '351 710 1674',
    mapsQuery: 'Prima Clean, Centro Commerciale Verona Uno, Via Monte Cristallo 1, San Giovanni Lupatoto VR',
    hours: null, // es. [['Lun–Sab', '9:00–20:00']] — inserire solo orari verificati
    badge: null,
    // posizione sulla mappa stilizzata (0–100, orientata a nord)
    map: { x: 18, y: 18 },
    schema: {
      streetAddress: 'Via Monte Cristallo 1, c/o Centro Commerciale Verona Uno',
      locality: 'San Giovanni Lupatoto',
      areaServed: ['Verona', 'San Giovanni Lupatoto'],
    },
  },
  {
    id: 'legnago',
    enabled: true,
    name: 'Legnago',
    place: 'Centro Commerciale Galassia',
    street: 'Via Mantova 5',
    city: 'Legnago (VR)',
    hint: 'All’interno del centro commerciale Galassia',
    phone: '333 404 8866',
    mapsQuery: 'Prima Clean, Centro Commerciale Galassia, Via Mantova 5, Legnago VR',
    hours: null,
    badge: null,
    map: { x: 70, y: 82 },
    schema: {
      streetAddress: 'Via Mantova 5, c/o Centro Commerciale Galassia',
      locality: 'Legnago',
      areaServed: ['Legnago'],
    },
  },
  {
    id: 'bovolone',
    enabled: true,
    name: 'Bovolone',
    place: 'Via Madonna',
    street: 'Via Madonna', // civico 266 da confermare prima di mostrarlo
    city: 'Bovolone (VR)',
    hint: 'Accanto al ristorante Dai Fradei',
    phone: '351 555 9048',
    mapsQuery: 'Ristorante Dai Fradei, Via Madonna, Bovolone VR',
    hours: null,
    badge: 'Aperto anche la domenica',
    map: { x: 36, y: 60 },
    schema: {
      streetAddress: 'Via Madonna (accanto al ristorante Dai Fradei)',
      locality: 'Bovolone',
      areaServed: ['Bovolone'],
    },
  },
  {
    id: 'cologna-veneta',
    enabled: true,
    provisional: true, // operatività della sede ancora da verificare
    name: 'Cologna Veneta',
    shortName: 'Cologna',
    place: 'Zona commerciale IperFamila',
    street: 'Viale del Lavoro 1',
    city: '37044 Cologna Veneta (VR)',
    hint: 'Nella zona commerciale IperFamila',
    phone: '392 260 7066',
    phoneVerified: false,
    mapsQuery: 'Viale del Lavoro 1, 37044 Cologna Veneta VR',
    hours: [['Lunedì–Sabato', '09:00–19:30']],
    hoursVerified: false, // apertura domenicale non confermata: non indicata
    badge: null,
    map: { x: 86, y: 40 },
    schema: {
      streetAddress: 'Viale del Lavoro 1, zona commerciale IperFamila',
      locality: 'Cologna Veneta',
      postalCode: '37044',
      areaServed: ['Cologna Veneta'],
    },
  },
]

/** Sedi visibili sul sito. */
export const activeStores = stores.filter((s) => s.enabled !== false)
/** Sedi con numero verificato: usate per chiamate rapide e contatti promo. */
export const callableStores = activeStores.filter((s) => s.phoneVerified !== false)
export const isPhoneVerified = (s) => s.phoneVerified !== false
export const areHoursVerified = (s) => s.hoursVerified !== false

const NUMBERS = ['zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci']
const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1)
export const storeCount = activeStores.length
/** "quattro" / "Quattro" — per titoli e testi che citano il numero di sedi. */
export const storeCountWord = NUMBERS[storeCount] ?? String(storeCount)
export const StoreCountWord = cap(storeCountWord)

/** "A, B, C e D" */
export const listJoin = (items) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} e ${items.at(-1)}`
/** Località servite, per testi e SEO. */
export const localities = activeStores.map((s) => s.schema.locality)

export const services = [
  {
    id: 'secco',
    n: '01',
    title: 'Lavaggio a secco',
    text: 'Per abiti, cappotti e capi strutturati che non amano l’acqua. Forma, colore e caduta restano quelli del primo giorno.',
    material: 'wool',
  },
  {
    id: 'acqua',
    n: '02',
    title: 'Lavaggio ad acqua',
    text: 'Camicie, cotoni e capi di uso quotidiano trattati con programmi professionali e stiratura accurata.',
    material: 'cotton',
  },
  {
    id: 'delicati',
    n: '03',
    title: 'Capi delicati e pelle',
    text: 'Seta, cashmere, pelle e scamosciati: trattamenti dedicati a fibre che chiedono mani esperte.',
    material: 'leather',
  },
  {
    id: 'tappeti',
    n: '04',
    title: 'Tappeti e tessili d’arredo',
    text: 'Tappeti, tende, copridivani e piumoni: grandi superfici, stessa attenzione al dettaglio.',
    material: 'rug',
  },
  {
    id: 'restauro',
    n: '05',
    title: 'Restauro tappeti',
    text: 'Interventi su frange, bordi e trama per restituire valore ai tappeti a cui tieni.',
    material: 'weave',
  },
  {
    id: 'impermeabilizzazione',
    n: '06',
    title: 'Impermeabilizzazione',
    text: 'Un trattamento che aiuta giacche e capi tecnici a respingere pioggia e umidità.',
    material: 'water',
  },
  {
    id: 'ozono',
    n: '07',
    title: 'Trattamento all’ozono',
    text: 'Igienizzazione delicata dei tessuti, pensata per eliminare gli odori senza stressare le fibre.',
    material: 'air',
  },
  {
    id: 'sottovuoto',
    n: '08',
    title: 'Servizio sottovuoto',
    text: 'Capi stagionali protetti e compatti, pronti da riporre nell’armadio fino al prossimo utilizzo.',
    material: 'vacuum',
  },
  {
    id: 'espresso',
    n: '09',
    title: 'Espresso 24 ore',
    text: 'Quando il tempo stringe: il tuo capo pronto in 24 ore, con la stessa cura di sempre.',
    material: 'express',
  },
]

/**
 * PROMOZIONI — aggiornabili.
 * `price`: stringa o null. Se null viene mostrato "Prezzo in negozio".
 * `active`: false per nascondere l'offerta senza cancellarla.
 * Nota: la promo storica "Camicia €2,00" NON è riportata finché il
 * prezzo non è confermato dal negozio.
 */
export const promotions = [
  {
    id: 'camicie',
    active: true,
    kicker: 'Servizio camicie',
    title: 'Camicie lavate e stirate a regola d’arte.',
    text: 'Collo, polsi e piega perfetti, pronte da indossare. Chiedi in negozio l’offerta in corso.',
    price: null,
    validity: null, // es. 'Fino al 31 dicembre'
    stores: 'Tutti i punti vendita',
  },
  {
    id: 'stagione',
    active: true,
    kicker: 'Cambio di stagione',
    title: 'Piumini, cappotti e lana: pronti per l’armadio.',
    text: 'Lavaggio e servizio sottovuoto per riporre i capi pesanti al riparo da polvere e umidità.',
    price: null,
    validity: null,
    stores: 'Disponibilità da verificare per sede',
  },
]

export const nav = [
  { href: '#cura', label: 'La cura' },
  { href: '#servizi', label: 'Servizi' },
  { href: '#perche', label: 'Perché noi' },
  { href: '#promozioni', label: 'Promozioni' },
  { href: '#negozi', label: 'Negozi' },
]

export const telHref = (phone) => `tel:+39${phone.replace(/\s/g, '')}`
export const directionsHref = (q) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`
export const mapsHref = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

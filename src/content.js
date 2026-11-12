/**
 * CONTENUTI DEL SITO — unico file da modificare per aggiornare testi,
 * sedi, servizi, promozioni e fotografie.
 *
 * Regola editoriale: pubblicare solo informazioni verificate.
 * I campi marcati `verified: false` vengono mostrati con la dicitura
 * "da confermare in negozio" oppure non vengono mostrati.
 */

export const brand = {
  name: '1A Clean',
  legalName: '1A Clean di Mattiolo Sonia',
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

export const stores = [
  {
    id: 'verona-uno',
    name: 'Verona Uno',
    place: 'Centro Commerciale Verona Uno',
    street: 'Via Monte Cristallo 1',
    city: 'San Giovanni Lupatoto (VR)',
    hint: 'All’interno della galleria del centro commerciale',
    phone: '351 710 1674',
    mapsQuery: '1A Clean, Centro Commerciale Verona Uno, Via Monte Cristallo 1, San Giovanni Lupatoto VR',
    hours: null, // es. [['Lun–Sab', '9:00–20:00']] — inserire solo orari verificati
    badge: null,
    // posizione indicativa sulla mappa stilizzata (0–100)
    map: { x: 30, y: 22 },
  },
  {
    id: 'legnago',
    name: 'Legnago',
    place: 'Centro Commerciale Galassia',
    street: 'Via Mantova 5',
    city: 'Legnago (VR)',
    hint: 'All’interno del centro commerciale Galassia',
    phone: '333 404 8866',
    mapsQuery: '1A Clean, Centro Commerciale Galassia, Via Mantova 5, Legnago VR',
    hours: null,
    badge: null,
    map: { x: 78, y: 78 },
  },
  {
    id: 'bovolone',
    name: 'Bovolone',
    place: 'Via Madonna',
    street: 'Via Madonna', // civico 266 da confermare prima di mostrarlo
    city: 'Bovolone (VR)',
    hint: 'Accanto al ristorante Dai Fradei',
    phone: '351 555 9048',
    mapsQuery: 'Ristorante Dai Fradei, Via Madonna, Bovolone VR',
    hours: null,
    badge: 'Aperto anche la domenica',
    map: { x: 46, y: 56 },
  },
]

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

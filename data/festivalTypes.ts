export interface FestivalDay {
  id: number
  name: string
  nameHindi: string
  tithi: string
  summary: string
  summaryHindi: string
  eventName?: string | null
  offsetFrom?: string
  offsetDays?: number
}

export interface FestivalDeity {
  name: string
  nameHindi: string
  note: string
  noteHindi: string
}

export interface FestivalHistoryItem {
  layer: string
  layerHindi: string
  claim: string
  claimHindi: string
  verdict: string
  verdictHindi: string
}

export interface FestivalPlace {
  id: number
  name: string
  nameHindi: string
  location: string
  state: string
  note: string
  noteHindi: string
  coordinates: { lat: number; lng: number }
}

export interface FestivalPractice {
  puja: string
  pujaHindi: string
  who: string
  whoHindi: string
  care: string
  careHindi: string
}

export interface FestivalPage {
  upcomingEventName: string
  tagline: string
  daysHeading: string
  monthLabel: string
  book: string
  title: string
  kind: string
  mapZoom?: number
  introduction: {
    title: string
    titleEnglish: string
    content: string
    contentEnglish: string
  }
  days: FestivalDay[]
  deities: FestivalDeity[]
  kathaHeading: string
  kathaHindi: string
  kathaEnglish: string
  history: FestivalHistoryItem[]
  places: FestivalPlace[]
  practice: FestivalPractice
  sources: string
}

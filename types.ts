export interface Verse {
  id: number;
  verse_number: number;
  chapter_number: number;
  text: string;
  transliteration: string;
  hindi_meaning: string;
  meaning: string;
}

export interface Chapter {
  id: number;
  chapter_number: number;
  name: string;
  name_meaning: string;
  summary: string;
  verses_count: number;
  verses: Verse[];
}

export type TextType = 'gita' | 'aarti' | 'hanumanChalisa' | 'sunderkand' | 'bajrangBaan' | 'yakshaPrashna' | 'satyanarayan' | 'shaktipeeths' | 'charDham' | 'jyotirlingas' | 'temples' | 'chhath' | 'diwali' | 'navratri' | 'shivaratri' | 'holi' | 'janmashtami' | 'ganeshChaturthi' | 'karvaChauth' | 'shastras';

export interface AartiStanza {
  id: number
  refrain?: boolean
  text: string
  transliteration: string
  hindi_meaning: string
  meaning: string
}

export interface AartiHymn {
  id: number
  chapter_number: number
  deity: string
  deityHindi: string
  name: string
  nameHindi: string
  summary: string
  stanzas: AartiStanza[]
}

export interface PathStanza {
  id: number
  text: string
}

export interface PathSection {
  id: number
  chapter_number: number
  group: 'purva' | 'madhya' | 'uttara'
  name: string
  nameHindi: string
  summary: string
  stanzas: PathStanza[]
}

export interface TextConfig {
  name: string;
  nameHindi: string;
  data: Chapter[];
}


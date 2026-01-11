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

export type TextType = 'gita' | 'hanumanChalisa' | 'sunderkand' | 'bajrangBaan' | 'yakshaPrashna' | 'shaktipeeths' | 'charDham' | 'jyotirlingas';

export interface TextConfig {
  name: string;
  nameHindi: string;
  data: Chapter[];
}


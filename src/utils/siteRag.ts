import { bajrangBaan } from '../../data/bajrangBaan.ts'
import { charDham, charDhamIntroduction } from '../../data/charDham.ts'
import { chhathDays, chhathIntroduction } from '../../data/chhathPuja.ts'
import { diwaliDays, diwaliIntroduction } from '../../data/diwali.ts'
import { ganeshChaturthiPage } from '../../data/ganeshChaturthi.ts'
import { gitaChapters } from '../../data/gita.ts'
import { hanumanChalisa } from '../../data/hanumanChalisa.ts'
import { holiPage } from '../../data/holi.ts'
import { janmashtamiPage } from '../../data/janmashtami.ts'
import { jyotirlingaIntroduction, jyotirlingas } from '../../data/jyotirlingas.ts'
import { karvaChauthPage } from '../../data/karvaChauth.ts'
import { mahaShivaratriPage } from '../../data/mahaShivaratri.ts'
import { navratriDays, navratriIntroduction } from '../../data/navratri.ts'
import { satyanarayanChapters } from '../../data/satyanarayan.ts'
import { shaktipeethIntroduction, shaktipeeths } from '../../data/shaktipeeths.ts'
import { sunderkandChapters } from '../../data/sunderkand.ts'
import { templeIntroduction, temples } from '../../data/temples.ts'
import { yakshaPrashna } from '../../data/yakshaPrashn.ts'
import type { RagChunk } from './ragChunk.ts'
import { siteChunksFromChapters, siteChunksFromCollection } from './siteChunks.ts'

function chaptersOf(
  rows: { chapter_number: number; name: string; name_meaning: string; summary: string }[],
  book: string,
  title: string,
): RagChunk[] {
  return siteChunksFromChapters(
    rows.map(({ chapter_number, name, name_meaning, summary }) => ({
      chapter_number,
      name,
      name_meaning,
      summary,
    })),
    { book, title },
  )
}

export function buildAllSiteChunks(): RagChunk[] {
  return [
    ...chaptersOf(gitaChapters, 'gita-site', 'Bhagavad Gita (homepage)'),
    ...chaptersOf(hanumanChalisa, 'hanuman-chalisa-site', 'Hanuman Chalisa (site)'),
    ...chaptersOf(sunderkandChapters, 'sunderkand-site', 'Sunderkand (site)'),
    ...chaptersOf(bajrangBaan, 'bajrang-baan-site', 'Bajrang Baan (site)'),
    ...chaptersOf(yakshaPrashna, 'yaksha-prashna-site', 'Yaksha Prashna (site)'),
    ...chaptersOf(satyanarayanChapters, 'satyanarayan-site', 'Satyanarayan Vrat Katha (site)'),
    ...siteChunksFromCollection(
      shaktipeeths.map((item) => ({
        id: item.id,
        name: item.name,
        extra: `${item.deviName}, ${item.bodyPart}, ${item.location}, ${item.state}, ${item.country}. ${item.description}`,
      })),
      {
        book: 'shaktipeeths-site',
        title: 'Shaktipeeths (site)',
        kind: 'Shaktipeeths',
        intro: shaktipeethIntroduction.contentEnglish,
      },
    ),
    ...siteChunksFromCollection(
      jyotirlingas.map((item) => ({
        id: item.id,
        name: item.name,
        extra: `${item.nameHindi}, ${item.location}, ${item.state}. ${item.significance}. ${item.description}`,
      })),
      {
        book: 'jyotirlingas-site',
        title: 'Jyotirlingas (site)',
        kind: 'Jyotirlingas',
        intro: jyotirlingaIntroduction.contentEnglish,
      },
    ),
    ...siteChunksFromCollection(
      charDham.map((item) => ({
        id: item.id,
        name: item.name,
        extra: `${item.nameHindi}, ${item.deity}, ${item.location}, ${item.state}. ${item.significance}. ${item.description}`,
      })),
      {
        book: 'char-dham-site',
        title: 'Char Dham (site)',
        kind: 'Char Dham sites',
        intro: charDhamIntroduction.contentEnglish,
      },
    ),
    ...siteChunksFromCollection(
      temples.map((item) => ({
        id: item.id,
        name: item.name,
        extra: `${item.nameHindi}, ${item.deity}, ${item.location}, ${item.state}. ${item.katha} ${item.history}`,
      })),
      {
        book: 'temples-site',
        title: 'Major temples (site)',
        kind: 'major temples',
        intro: templeIntroduction.contentEnglish,
      },
    ),
    ...siteChunksFromCollection(
      chhathDays.map((item) => ({
        id: item.id,
        name: item.name,
        extra: `${item.nameHindi}, ${item.tithi}. ${item.summary}`,
      })),
      {
        book: 'chhath-site',
        title: 'Chhath Puja (site)',
        kind: 'Chhath days',
        intro: chhathIntroduction.contentEnglish,
      },
    ),
    ...siteChunksFromCollection(
      diwaliDays.map((item) => ({
        id: item.id,
        name: item.name,
        extra: `${item.nameHindi}, ${item.tithi}. ${item.summary}`,
      })),
      {
        book: 'diwali-site',
        title: 'Diwali (site)',
        kind: 'Diwali days',
        intro: diwaliIntroduction.contentEnglish,
      },
    ),
    ...siteChunksFromCollection(
      navratriDays.map((item) => ({
        id: item.id,
        name: item.name,
        extra: `${item.nameHindi}, ${item.tithi}. ${item.summary}`,
      })),
      {
        book: 'navratri-site',
        title: 'Navratri (site)',
        kind: 'Navratri nights',
        intro: navratriIntroduction.contentEnglish,
      },
    ),
    ...[mahaShivaratriPage, holiPage, janmashtamiPage, ganeshChaturthiPage, karvaChauthPage].flatMap((page) =>
      siteChunksFromCollection(
        page.days.map((item) => ({
          id: item.id,
          name: item.name,
          extra: `${item.nameHindi}, ${item.tithi}. ${item.summary}`,
        })),
        {
          book: page.book,
          title: page.title,
          kind: page.kind,
          intro: page.introduction.contentEnglish,
        },
      ),
    ),
  ]
}

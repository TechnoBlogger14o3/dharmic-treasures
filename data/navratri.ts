export interface NavratriDay {
  id: number
  name: string
  nameHindi: string
  tithi: string
  summary: string
  summaryHindi: string
}

export const navratriIntroduction = {
  title: 'नवरात्रि',
  titleEnglish: 'Navratri — nine nights of the Goddess',
  content: `शरद नवरात्रि आश्विन शुक्ल प्रतिपदा से नवमी तक है — दुर्गा की नौ रातें। दसवीं विजयादशमी / दशहरा। घर में घटस्थापना, गुजरात में गरबा, बंगाल में दुर्गा पूजा के पंडाल, उत्तर में रामलीला — एक चन्द्र, भिन्न मुख्य रूप।

चैत्र नवरात्रि वसंत में होती है और राम नवमी पर पूरी। यह पृष्ठ शरद का स्मरण है। तिथि नगर के सूर्योदय से बँधी है — पंचांग से जाँचें।`,
  contentEnglish: `Sharad Navratri runs from Ashwin Shukla Pratipada to Navami — nine nights of Durga. The tenth is Vijayadashami / Dussehra. Homes keep ghatasthapana; Gujarat keeps Garba; Bengal raises Durga Puja pandals; the North stages Ramlila. Same moon, different main form.

Chaitra Navratri is the spring set, closing on Ram Navami. This page is the autumn one. Tithi follows local sunrise. Check the panchang.`,
}

export const navratriDays: NavratriDay[] = [
  {
    id: 1,
    name: 'Shailaputri',
    nameHindi: 'शैलपुत्री',
    tithi: 'Ashwin Shukla Pratipada',
    summary:
      'Daughter of the mountain. Ghatasthapana: a pot, barley, and the first lamp. The vrata begins.',
    summaryHindi: 'पर्वत-पुत्री। घटस्थापना — कलश, जौ, पहला दीप। व्रत यहीं से।',
  },
  {
    id: 2,
    name: 'Brahmacharini',
    nameHindi: 'ब्रह्मचारिणी',
    tithi: 'Ashwin Shukla Dwitiya',
    summary: 'The tapasvin form. Many homes keep a simple fast and a quiet evening lamp.',
    summaryHindi: 'तपस्विनी रूप। कई घरों में सादा व्रत और शाम का दीप।',
  },
  {
    id: 3,
    name: 'Chandraghanta',
    nameHindi: 'चंद्रघंटा',
    tithi: 'Ashwin Shukla Tritiya',
    summary: 'The bell on the brow. Courage named as a goddess, not as noise.',
    summaryHindi: 'भाल पर घंटा। साहस देवी के नाम से — शोर से नहीं।',
  },
  {
    id: 4,
    name: 'Kushmanda',
    nameHindi: 'कूष्माण्डा',
    tithi: 'Ashwin Shukla Chaturthi',
    summary: 'The cosmic egg; warmth and grain. Pumpkin or gourd is a common offering in some homes.',
    summaryHindi: 'ब्रह्माण्ड-अण्ड; ऊष्मा और अन्न। कुछ घरों में कद्दू या लौकी का नैवेद्य।',
  },
  {
    id: 5,
    name: 'Skandamata',
    nameHindi: 'स्कंदमाता',
    tithi: 'Ashwin Shukla Panchami',
    summary: 'Mother of Skanda. The day’s thought is the child held, not the war outside.',
    summaryHindi: 'स्कंद की माता। दिन का भाव गोद का बालक है, बाहर का युद्ध नहीं।',
  },
  {
    id: 6,
    name: 'Katyayani',
    nameHindi: 'कात्यायनी',
    tithi: 'Ashwin Shukla Shashthi',
    summary:
      'Born in the hermitage of Kata. In Bengal this week the pratima is already in the pandal.',
    summaryHindi: 'कत के आश्रम में जन्मी। बंगाल में इसी सप्ताह प्रतिमा पंडाल में होती है।',
  },
  {
    id: 7,
    name: 'Kalaratri',
    nameHindi: 'कालरात्रि',
    tithi: 'Ashwin Shukla Saptami',
    summary: 'The dark night that ends fear. Maha Saptami in Bengal: the public puja is fully open.',
    summaryHindi: 'भय हरने वाली कृष्ण रात। बंगाल में महा सप्तमी — सार्वजनिक पूजा पूरी तरह खुली।',
  },
  {
    id: 8,
    name: 'Mahagauri',
    nameHindi: 'महागौरी',
    tithi: 'Ashwin Shukla Ashtami',
    summary:
      'Maha Ashtami. Many North Indian homes do Kanya Puja. Sandhi puja sits where Ashtami meets Navami.',
    summaryHindi: 'महा अष्टमी। उत्तर के कई घरों में कन्या पूजा। संधि पूजा अष्टमी-नवमी की संधि पर।',
  },
  {
    id: 9,
    name: 'Siddhidatri',
    nameHindi: 'सिद्धिदात्री',
    tithi: 'Ashwin Shukla Navami',
    summary:
      'Maha Navami. The nine nights close. Next morning, where the tithi holds, is Vijayadashami.',
    summaryHindi: 'महा नवमी। नौ रातें यहीं पूरी। अगली सुबह, तिथि रहे तो, विजयादशमी।',
  },
]

export const navratriDeities = [
  {
    name: 'Durga',
    nameHindi: 'दुर्गा',
    note: 'The nine nights are her forms. The image is one; the names change with the tithi.',
    noteHindi: 'नौ रातें उन्हीं के रूप। मूर्ति एक; नाम तिथि के साथ बदलते हैं।',
  },
  {
    name: 'Navadurga',
    nameHindi: 'नवदुर्गा',
    note: 'Shailaputri to Siddhidatri. A teaching sequence, not nine rival temples.',
    noteHindi: 'शैलपुत्री से सिद्धिदात्री। पाठ का क्रम है, नौ प्रतिद्वंद्वी मंदिर नहीं।',
  },
  {
    name: 'Rama',
    nameHindi: 'राम',
    note: 'North Indian Dussehra remembers the victory at Lanka. It shares the Dashami, not the nine-night vrata.',
    noteHindi: 'उत्तर का दशहरा लंका-विजय याद करता है। दशमी साझा है; नौ रात का व्रत नहीं।',
  },
  {
    name: 'Regional devis',
    nameHindi: 'क्षेत्र की देवी',
    note: 'Vaishno Devi, Kamakhya, Ambaji, and the Bengali Mahishasuramardini sit on the same fortnight.',
    noteHindi: 'वैष्णो देवी, कामाख्या, अंबाजी, बंगाल की महिषासुरमर्दिनी — एक ही पक्ष।',
  },
]

export const navratriKathaHindi =
  'मार्कण्डेय पुराण का देवी माहात्म्य: देवों की तेज से दुर्गा बनीं; महिषासुर का वध हुआ। शरद की कथा यही है। उत्तर की रामलीला दूसरी कथा है — राम का रावण पर विजय, उसी दशमी के पास। दोनों एक “पहली नवरात्रि” नहीं बनतीं।'

export const navratriKathaEnglish =
  'The Devi Mahatmya in the Markandeya Purana: Durga is formed from the gods’ tejas and slays Mahishasura. That is the autumn katha. North Indian Ramlila is another story — Rama’s victory over Ravana, near the same Dashami. They are not one dated “first Navratri”.'

export const navratriHistory = [
  {
    layer: 'Season and ghat',
    layerHindi: 'ऋतु और घट',
    claim: 'Ashwin sits after the rains; barley on the pot is a harvest sign as much as a rite.',
    claimHindi: 'आश्विन वर्षा के बाद; कलश पर जौ फसल का चिह्न भी है, केवल विधि नहीं।',
    verdict: 'True as a living custom. It does not fix an epic first night.',
    verdictHindi: 'जीवित रीत है। महाकाव्य की “पहली रात” इससे नहीं मिलती।',
  },
  {
    layer: 'Purana katha',
    layerHindi: 'पुराण कथा',
    claim: 'Devi Mahatmya; nine names taught as Navadurga.',
    claimHindi: 'देवी माहात्म्य; नवदुर्गा के नौ नाम।',
    verdict: 'These sanction the nights. They are not a single historical first ghatasthapana.',
    verdictHindi: 'ये रातों को आधार देते हैं। इतिहास की एक पहली घटस्थापना नहीं।',
  },
  {
    layer: 'Regional nines',
    layerHindi: 'क्षेत्र की नौ',
    claim: 'Durga Puja, Garba, Mysore Dasara, Kullu, and Ramlila share the fortnight.',
    claimHindi: 'दुर्गा पूजा, गरबा, मैसूर दशहरा, कुल्लू, रामलीला — एक पक्ष।',
    verdict: 'Same moon, different main public rite. Do not flatten them into one vidhi.',
    verdictHindi: 'एक चन्द्र, भिन्न मुख्य सार्वजनिक विधि। एक विधि में मिलाना ठीक नहीं।',
  },
]

export const navratriPlaces = [
  {
    id: 1,
    name: 'Vaishno Devi',
    nameHindi: 'वैष्णो देवी',
    location: 'Katra',
    state: 'Jammu and Kashmir',
    note: 'The cave shrine fills through the nine nights. The walk is the pilgrimage; the date is still the tithi.',
    noteHindi: 'नौ रात गुफा भरती है। चलना तीर्थ है; तिथि फिर भी पंचांग की है।',
    coordinates: { lat: 33.0297, lng: 74.9489 },
  },
  {
    id: 2,
    name: 'Kamakhya',
    nameHindi: 'कामाख्या',
    location: 'Guwahati',
    state: 'Assam',
    note: 'A principal Shaktipeeth. Sharad here is Durga’s fortnight, not a North Indian ghatasthapana copy.',
    noteHindi: 'प्रमुख शक्तिपीठ। यहाँ शरद दुर्गा का पक्ष है, उत्तर की घटस्थापना की नकल नहीं।',
    coordinates: { lat: 26.1664, lng: 91.7056 },
  },
  {
    id: 3,
    name: 'Durga Puja / Kalighat',
    nameHindi: 'दुर्गा पूजा / कालीघाट',
    location: 'Kolkata',
    state: 'West Bengal',
    note: 'The city’s main autumn rite is the pandal, Maha Ashtami to Dashami, then visarjan. Same moon as Navratri, another public form.',
    noteHindi: 'नगर की मुख्य शरद विधि पंडाल है — महा अष्टमी से दशमी, फिर विसर्जन। वही चन्द्र, भिन्न सार्वजनिक रूप।',
    coordinates: { lat: 22.5202, lng: 88.342 },
  },
  {
    id: 4,
    name: 'Ambaji',
    nameHindi: 'अंबाजी',
    location: 'Ambaji',
    state: 'Gujarat',
    note: 'Garba and the Ambaji yatra run through these nights. The dance is a vow, not a concert.',
    noteHindi: 'गरबा और अंबाजी यात्रा इन्हीं रातों में। नृत्य व्रत है, संगीत-सभा नहीं।',
    coordinates: { lat: 24.3315, lng: 72.8513 },
  },
  {
    id: 5,
    name: 'Mysore Palace',
    nameHindi: 'मैसूर महल',
    location: 'Mysuru',
    state: 'Karnataka',
    note: 'Dasara here is a royal ten-day public festival ending on Vijayadashami. It is not a home Navratri vrata.',
    noteHindi: 'यहाँ दशहरा राजसी दस दिन का सार्वजनिक पर्व है, विजयादशमी पर पूरा। घर का नवरात्रि व्रत नहीं।',
    coordinates: { lat: 12.3051, lng: 76.6551 },
  },
  {
    id: 6,
    name: 'Kullu Dussehra',
    nameHindi: 'कुल्लू दशहरा',
    location: 'Kullu',
    state: 'Himachal Pradesh',
    note: 'Begins on Vijayadashami and runs a week. Do not read it as night one of the nine.',
    noteHindi: 'विजयादशमी से आरम्भ, एक सप्ताह। इसे नौ में की पहली रात मत पढ़ें।',
    coordinates: { lat: 31.9579, lng: 77.1095 },
  },
]

export const navratriPractice = {
  puja: 'Ghatasthapana on Pratipada if the tithi holds in the morning. Sow barley on the pot. Offer a lamp each night. Many homes do Kanya Puja on Ashtami or Navami — nine girls, or as many as the house can host, with a simple meal.',
  pujaHindi:
    'प्रतिपदा की सुबह तिथि रहे तो घटस्थापना। कलश पर जौ। प्रत्येक रात दीप। कई घर अष्टमी या नवमी पर कन्या पूजा — नौ कन्या, या जितनी घर सँभाले, सादा भोजन।',
  who: 'A household vrata and a public festival. No priest is required at home. Pandals, Garba grounds, and Ramlila are community work.',
  whoHindi: 'गृह-व्रत और सार्वजनिक पर्व। घर में पुजारी अनिवार्य नहीं। पंडाल, गरबा मैदान, रामलीला — समाज का काम।',
  care: 'Civil dates on this page follow a North India list from the start tithi. Ashtami–Navami can spill a day. Fasting is optional; children, pregnant women, and the ill should eat. Crowds at pandals and visarjan need a meeting point and water.',
  careHindi:
    'इस पृष्ठ की नागरिक तिथियाँ उत्तर की सूची और आरम्भ तिथि से हैं। अष्टमी-नवमी एक दिन खिसक सकती है। व्रत ऐच्छिक; बच्चे, गर्भवती, रोगी खाएँ। पंडाल और विसर्जन में भीड़ — मिलने का स्थान और जल।',
}

export const navratriSources =
  'Drik Panchang festival lists (Delhi) for Sharad Navratri begins and Dussehra 2025–2027; Devi Mahatmya (Markandeya Purana) for the katha; Navadurga names as commonly taught; regional notes for Durga Puja, Garba, Mysore Dasara, and Kullu. Confirm ghatasthapana and sandhi puja with a local panchang.'

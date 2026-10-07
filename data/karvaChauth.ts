import type { FestivalPage } from './festivalTypes'

export const karvaChauthPage: FestivalPage = {
  upcomingEventName: 'Karva Chauth',
  tagline: 'Kartik Krishna Chaturthi · sargi, a day’s fast, moonrise',
  daysHeading: 'तीन घड़ियाँ · Three hours of the day',
  monthLabel: 'Kartik',
  book: 'karva-site',
  title: 'Karva Chauth (site)',
  kind: 'Karva Chauth hours',
  mapZoom: 5,
  introduction: {
    title: 'करवा चौथ',
    titleEnglish: 'Karva Chauth — a North Indian fast till moonrise',
    content: `करवा चौथ कार्तिक कृष्ण चतुर्थी है — अमान्त गणना में आश्विन। उत्तर भारत का व्रत: सुबह सर्गि, दिन भर निर्जला कई घरों में, चाँद पर छलनी से दृष्टि, फिर पानी। यह मंदिर-यात्रा नहीं, गृह व्रत है।

चन्द्रोदय नगर से नगर बदलता है। दिल्ली की घड़ी से पारण न करें।`,
    contentEnglish: `Karva Chauth is Kartik Krishna Chaturthi — Ashwin in the amanta count. A North Indian vrata: sargi before dawn, often a dry fast through the day, the moon seen through a sieve, then water. It is a house fast, not a temple yatra.

Moonrise moves from town to town. Do not break the fast on a Delhi clock.`,
  },
  days: [
    {
      id: 1,
      name: 'Sargi',
      nameHindi: 'सर्गि',
      tithi: 'Kartik Krishna Chaturthi · before sunrise',
      eventName: 'Karva Chauth',
      summary: 'A meal given by the mother-in-law or a senior woman before sunrise. The fast begins when the sun is up.',
      summaryHindi: 'सूर्योदय से पहले सास या बड़ी स्त्री का भोजन। सूरज निकलते ही व्रत।',
    },
    {
      id: 2,
      name: 'The day fast',
      nameHindi: 'दिन का व्रत',
      tithi: 'Kartik Krishna Chaturthi · daylight',
      eventName: 'Karva Chauth',
      summary: 'Many keep nirjala; some sip water. The karva (earthen pot) and a tray are readied. Mehandi is custom, not shastra.',
      summaryHindi: 'बहुत निर्जला रखते हैं; कुछ जल लेते हैं। करवा और थाल सजाते हैं। मेहँदी रीत है, शास्त्र नहीं।',
    },
    {
      id: 3,
      name: 'Moonrise puja',
      nameHindi: 'चन्द्रोदय पूजा',
      tithi: 'Kartik Krishna Chaturthi · after moonrise',
      eventName: 'Karva Chauth',
      summary: 'The moon is seen through a sieve. Water and the first sip are offered, then the fast ends. The husband’s presence is a later household form, not the only valid close.',
      summaryHindi: 'छलनी से चाँद। जल और पहला घूँट, फिर पारण। पति की उपस्थिति बाद की गृह-रीत है, एकमात्र विधि नहीं।',
    },
  ],
  deities: [
    {
      name: 'Parvati / Gauri',
      nameHindi: 'पार्वती / गौरी',
      note: 'The tray often holds Gauri. The vow is spoken to her, then the moon.',
      noteHindi: 'थाल में प्रायः गौरी। वचन पहले उन्हें, फिर चन्द्र को।',
    },
    {
      name: 'Shiva',
      nameHindi: 'शिव',
      note: 'Named with Parvati in the karva katha. Not a linga-night like Shivaratri.',
      noteHindi: 'करवा कथा में पार्वती के साथ। शिवरात्रि जैसी लिंग-रात नहीं।',
    },
    {
      name: 'The moon',
      nameHindi: 'चन्द्र',
      note: 'The fast ends on sight, not on a clock. Cloud or a late moonrise can stretch the hour.',
      noteHindi: 'व्रत दृष्टि पर पूरा, घड़ी पर नहीं। बादल या देर का उदय घड़ी खींच सकता है।',
    },
  ],
  kathaHeading: 'कथा · Two tellings',
  kathaHindi:
    'वीरवती ने व्रत तोड़ा, पति मुर्छित हुए; सास की कथा सुन पुनः व्रत पूरा किया। सावित्री-सत्यवान दूसरी कथा है — करवा चौथ की मूल नहीं, बाद में जोड़ी जाती है। दोनों एक ऐतिहासिक “पहली चौथ” नहीं।',
  kathaEnglish:
    'Veeravati broke the fast; her husband collapsed; she heard the katha from her mother-in-law and completed the vow. Savitri and Satyavan are a second story — not the root of Karva Chauth, later attached. Neither is a historical “first Chauth”.',
  history: [
    {
      layer: 'North Indian house fast',
      layerHindi: 'उत्तर का गृह व्रत',
      claim: 'Kartik Krishna Chaturthi; women of a neighbourhood sit with one katha and one moon.',
      claimHindi: 'कार्तिक कृष्ण चतुर्थी; मोहल्ले की स्त्रियाँ एक कथा और एक चन्द्र के साथ।',
      verdict: 'True as a living custom of the North and West. It is not a pan-India temple festival.',
      verdictHindi: 'उत्तर-पश्चिम की जीवित रीत है। अखिल भारतीय मंदिर-पर्व नहीं।',
    },
    {
      layer: 'Katha',
      layerHindi: 'कथा',
      claim: 'Veeravati; sometimes Savitri grafted on.',
      claimHindi: 'वीरवती; कभी सावित्री जोड़ दी जाती है।',
      verdict: 'These sanction the fast. They are not one dated first sieve-and-moon.',
      verdictHindi: 'ये व्रत को आधार देते हैं। इतिहास की पहली छलनी-चाँद नहीं।',
    },
    {
      layer: 'Bazaar week',
      layerHindi: 'बाजार सप्ताह',
      claim: 'Mehandi, gifts, and televised moonrise are recent public layers.',
      claimHindi: 'मेहँदी, उपहार, टीवी चन्द्रोदय — नए सार्वजनिक परत।',
      verdict: 'Commerce around a vrata is not the vrata. The sight of the moon still closes it.',
      verdictHindi: 'व्रत के पास व्यापार व्रत नहीं। समाप्ति फिर भी चन्द्र-दृष्टि है।',
    },
  ],
  places: [
    {
      id: 1,
      name: 'Old Delhi terraces',
      nameHindi: 'पुरानी दिल्ली की छतें',
      location: 'Delhi',
      state: 'Delhi',
      note: 'A house and gali vrata. The moon is over the terrace, not over a shrine queue.',
      noteHindi: 'घर और गली का व्रत। चाँद छत पर है, मंदिर पंक्ति पर नहीं।',
      coordinates: { lat: 28.6562, lng: 77.241 },
    },
    {
      id: 2,
      name: 'Walled city / Johari',
      nameHindi: 'जोहारी बाज़ार',
      location: 'Jaipur',
      state: 'Rajasthan',
      note: 'Rajasthan keeps the fast with its own sargi plates. Moonrise is still the city’s panchang.',
      noteHindi: 'राजस्थान अपनी सर्गि थाली के साथ व्रत रखता है। चन्द्रोदय फिर भी नगर के पंचांग से।',
      coordinates: { lat: 26.926, lng: 75.8235 },
    },
    {
      id: 3,
      name: 'Amritsar homes',
      nameHindi: 'अमृतसर के घर',
      location: 'Amritsar',
      state: 'Punjab',
      note: 'Punjab’s karva week is a household cluster. The Golden Temple is not the vrata’s seat.',
      noteHindi: 'पंजाब का करवा सप्ताह घरों का समूह है। स्वर्ण मंदिर इस व्रत की गद्दी नहीं।',
      coordinates: { lat: 31.62, lng: 74.8765 },
    },
    {
      id: 4,
      name: 'Chandigarh sectors',
      nameHindi: 'चंडीगढ़ सेक्टर',
      location: 'Chandigarh',
      state: 'Chandigarh',
      note: 'A late planned-city form of the same Chaturthi. Check moonrise for Chandigarh, not Delhi.',
      noteHindi: 'उसी चतुर्थी का बाद का नियोजित-नगर रूप। चन्द्रोदय चंडीगढ़ का देखें, दिल्ली का नहीं।',
      coordinates: { lat: 30.7333, lng: 76.7794 },
    },
  ],
  practice: {
    puja: 'Eat sargi before sunrise. Keep the fast as the body allows. In the evening sit with the karva, lamp, and katha. When the moon is up, look through the sieve, offer water, and drink. A senior woman may tell the katha if no printed copy is kept.',
    pujaHindi:
      'सूर्योदय से पहले सर्गि। शरीर रहे तो व्रत। शाम करवा, दीप, कथा। चाँद निकले तो छलनी से देखें, जल दें, पिएँ। छपी कथा न हो तो बड़ी स्त्री सुनाएँ।',
    who: 'A household vrata of married women in much of North and West India. Unmarried women and men sometimes sit with them; that is family choice, not a rule.',
    whoHindi: 'उत्तर-पश्चिम में विवाहिताओं का गृह व्रत। अविवाहिता और पुरुष साथ बैठें तो परिवार का चुनाव, नियम नहीं।',
    care: 'Moonrise is local to the minute. Nirjala is not required for the ill, pregnant, or nursing. Do not wait on a television city. If the moon is clouded, follow the family elder and the city panchang, not a social-media clock.',
    careHindi:
      'चन्द्रोदय मिनट तक स्थानीय है। रोगी, गर्भवती, स्तनपान — निर्जला अनिवार्य नहीं। टीवी नगर की प्रतीक्षा न करें। बादल हों तो घर की बड़ी और नगर पंचांग, सोशल घड़ी नहीं।',
  },
  sources:
    'Drik Panchang festival lists (Delhi) for Karva Chauth 2025–2027; Veeravati katha as the common telling; Savitri as a later graft. Confirm moonrise for your city, not a capital clock.',
}

export const karvaChauthDays = karvaChauthPage.days
export const karvaChauthIntroduction = karvaChauthPage.introduction

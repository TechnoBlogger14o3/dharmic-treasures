import type { FestivalPage } from './festivalTypes.ts'

export const mahaShivaratriPage: FestivalPage = {
  upcomingEventName: 'Maha Shivaratri',
  tagline: 'Phalguna Krishna Chaturdashi · a night watch, not a morning fair',
  daysHeading: 'चार पहर · Four watches',
  monthLabel: 'Phalguna',
  book: 'shivaratri-site',
  title: 'Maha Shivaratri (site)',
  kind: 'Shivaratri watches',
  mapZoom: 4,
  introduction: {
    title: 'महा शिवरात्रि',
    titleEnglish: 'Maha Shivaratri — the great night of Shiva',
    content: `महा शिवरात्रि फाल्गुन कृष्ण चतुर्दशी की रात है — उपवास, शिवलिंग पर जल-बेल, और चार पहर की पूजा। ज्योतिर्लिंग मंदिरों में रात जागरण है। यह शिव की रात है, सुबह का मेला नहीं।

निशीथ काल — आधी रात के पास — कई पंचांगों में मुख्य मुहूर्त माना जाता है। नगर के सूर्योदय-सूर्यास्त से जाँचें।`,
    contentEnglish: `Maha Shivaratri is the night of Phalguna Krishna Chaturdashi — a fast, water and bel on the linga, and four prahar pujas. Jyotirlinga temples keep an all-night watch. It is Shiva’s night, not a morning fair.

Nishita kaal, around midnight, is the main window in many panchangs. Check local sunrise and sunset.`,
  },
  days: [
    {
      id: 1,
      name: 'First prahar',
      nameHindi: 'प्रथम प्रहर',
      tithi: 'Phalguna Krishna Chaturdashi · evening',
      eventName: 'Maha Shivaratri',
      summary: 'The night opens after sunset. A bath, clean cloth, and the first jalabhishek.',
      summaryHindi: 'सूर्यास्त के बाद रात खुलती है। स्नान, स्वच्छ वस्त्र, पहला जलाभिषेक।',
    },
    {
      id: 2,
      name: 'Second prahar',
      nameHindi: 'द्वितीय प्रहर',
      tithi: 'Phalguna Krishna Chaturdashi · late evening',
      eventName: 'Maha Shivaratri',
      summary: 'The fast is held. Many homes offer bel, dhatura, and a lamp that is not left alone.',
      summaryHindi: 'व्रत रहता है। कई घर बेल, धतूरा, और एक अकेला न छोड़ा दीप चढ़ाते हैं।',
    },
    {
      id: 3,
      name: 'Third prahar / Nishita',
      nameHindi: 'तृतीय प्रहर / निशीथ',
      tithi: 'Phalguna Krishna Chaturdashi · midnight',
      eventName: 'Maha Shivaratri',
      summary: 'Nishita is the still hour. Temple queues peak. The linga is bathed again.',
      summaryHindi: 'निशीथ स्थिर घड़ी है। मंदिर की पंक्ति यहीं लंबी। लिंग फिर नहाया जाता है।',
    },
    {
      id: 4,
      name: 'Fourth prahar',
      nameHindi: 'चतुर्थ प्रहर',
      tithi: 'Phalguna Krishna Chaturdashi · before dawn',
      eventName: 'Maha Shivaratri',
      summary: 'The watch closes before sunrise. The fast is broken after the last puja, as the family does.',
      summaryHindi: 'जागरण सूर्योदय से पहले पूरा। अंतिम पूजा के बाद पारण — जैसा घर में चला आता है।',
    },
  ],
  deities: [
    {
      name: 'Shiva',
      nameHindi: 'शिव',
      note: 'Worshipped as the linga this night — form without a face, water without a feast.',
      noteHindi: 'इस रात लिंग रूप — मुख नहीं, जल है, भोज नहीं।',
    },
    {
      name: 'Parvati',
      nameHindi: 'पार्वती',
      note: 'The vivah katha sits beside the night. Some homes keep a small Gauri beside the linga.',
      noteHindi: 'विवाह कथा रात के पास है। कुछ घर लिंग के पास छोटी गौरी रखते हैं।',
    },
    {
      name: 'Nandi',
      nameHindi: 'नंदी',
      note: 'The bull faces the door. Offerings pass him before they reach the linga.',
      noteHindi: 'बैल द्वार की ओर। नैवेद्य पहले नंदी के पास से जाता है।',
    },
  ],
  kathaHeading: 'कथा · Two stories',
  kathaHindi:
    'एक कथा: समुद्र मंथन में हलाहल; शिव ने नीलकण्ठ होकर पी लिया। दूसरी: पार्वती की तपस्या और विवाह। दोनों रात को आधार देती हैं। एक “पहली शिवरात्रि” की नागरिक तिथि नहीं बनतीं।',
  kathaEnglish:
    'One katha: the ocean-churn poison; Shiva drinks and becomes Nilakantha. Another: Parvati’s tapas and the wedding. Both sanction the night. They do not fix a civil “first Shivaratri”.',
  history: [
    {
      layer: 'Night and fast',
      layerHindi: 'रात और व्रत',
      claim: 'Chaturdashi after sunset is the rite; the day-fair is later custom at some temples.',
      claimHindi: 'सूर्यास्त के बाद चतुर्दशी विधि है; कुछ मंदिरों का दिन-मेला बाद की रीत है।',
      verdict: 'True as a living watch. It does not date the katha.',
      verdictHindi: 'जीवित जागरण है। कथा की तिथि इससे नहीं मिलती।',
    },
    {
      layer: 'Purana katha',
      layerHindi: 'पुराण कथा',
      claim: 'Nilakantha; Shiva-Parvati vivah.',
      claimHindi: 'नीलकण्ठ; शिव-पार्वती विवाह।',
      verdict: 'These sanction the night. They are not one historical first linga-watch.',
      verdictHindi: 'ये रात को आधार देते हैं। इतिहास की एक पहली जागरण नहीं।',
    },
    {
      layer: 'Jyotirlinga nights',
      layerHindi: 'ज्योतिर्लिंग रात',
      claim: 'Twelve lingas keep the same tithi; each town adds its own queue and offering.',
      claimHindi: 'बारह लिंग एक तिथि रखते हैं; प्रत्येक नगर अपनी पंक्ति और नैवेद्य जोड़ता है।',
      verdict: 'Same moon, different temple custom. Do not flatten them into one vidhi.',
      verdictHindi: 'एक चन्द्र, भिन्न मंदिर-रीत। एक विधि में मिलाना ठीक नहीं।',
    },
  ],
  places: [
    {
      id: 1,
      name: 'Kashi Vishwanath',
      nameHindi: 'काशी विश्वनाथ',
      location: 'Varanasi',
      state: 'Uttar Pradesh',
      note: 'The night queue is the city’s public form of a home jalabhishek.',
      noteHindi: 'रात की पंक्ति — घर के जलाभिषेक का नगर रूप।',
      coordinates: { lat: 25.3109, lng: 83.0107 },
    },
    {
      id: 2,
      name: 'Mahakaleshwar',
      nameHindi: 'महाकालेश्वर',
      location: 'Ujjain',
      state: 'Madhya Pradesh',
      note: 'A jyotirlinga that faces south. The night here is temple-time, not a Delhi clock.',
      noteHindi: 'दक्षिणामूर्ति ज्योतिर्लिंग। यहाँ रात मंदिर की घड़ी से है, दिल्ली से नहीं।',
      coordinates: { lat: 23.1828, lng: 75.7682 },
    },
    {
      id: 3,
      name: 'Somnath',
      nameHindi: 'सोमनाथ',
      location: 'Prabhas Patan',
      state: 'Gujarat',
      note: 'First among the twelve in the common list. The sea is near; the linga is still the rite.',
      noteHindi: 'बारह में प्रायः पहला। समुद्र पास; विधि फिर भी लिंग है।',
      coordinates: { lat: 20.888, lng: 70.4012 },
    },
    {
      id: 4,
      name: 'Kedarnath',
      nameHindi: 'केदारनाथ',
      location: 'Kedarnath',
      state: 'Uttarakhand',
      note: 'If the shrine is closed in winter, the night is kept at Ukhimath. Confirm the year’s seat.',
      noteHindi: 'शीत में कपाट बंद हों तो रात उखीमठ में। उस वर्ष का आसन जाँचें।',
      coordinates: { lat: 30.7352, lng: 79.0669 },
    },
  ],
  practice: {
    puja: 'Bathe. Offer water, milk if the house does, bel leaves, and a lamp. Keep four pujas if you sit the night; one sincere jalabhishek is enough at home. Break the fast after the last offering, as the family does.',
    pujaHindi:
      'स्नान। जल, घर करे तो दूध, बेल, दीप। रात बैठें तो चार पूजा; घर में एक सावधान जलाभिषेक काफी। अंतिम नैवेद्य के बाद पारण — जैसा घर में है।',
    who: 'A household vrata and a temple night. No priest is required at home. Jyotirlinga towns keep public queues.',
    whoHindi: 'गृह-व्रत और मंदिर की रात। घर में पुजारी अनिवार्य नहीं। ज्योतिर्लिंग नगर सार्वजनिक पंक्ति रखते हैं।',
    care: 'Nishita follows local midnight, not a TV clock. Fasting is optional for the ill, children, and pregnant women. Temple crowds need water and a meeting point. Dhatura is poisonous — do not eat offerings meant for the linga.',
    careHindi:
      'निशीथ स्थानीय मध्यरात्रि से है, टीवी घड़ी से नहीं। रोगी, बच्चे, गर्भवती — व्रत ऐच्छिक। मंदिर की भीड़ में जल और मिलने का स्थान। धतूरा विष है — लिंग का नैवेद्य न खाएँ।',
  },
  sources:
    'Drik Panchang festival lists (Delhi) for Maha Shivaratri 2025–2027; common four-prahar home watch; Nilakantha and vivah kathas; Jyotirlinga night custom. Confirm nishita with a local panchang.',
}

export const mahaShivaratriDays = mahaShivaratriPage.days
export const mahaShivaratriIntroduction = mahaShivaratriPage.introduction

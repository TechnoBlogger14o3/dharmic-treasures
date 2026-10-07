import type { FestivalPage } from './festivalTypes'

export const holiPage: FestivalPage = {
  upcomingEventName: 'Holika Dahan',
  tagline: 'Phalguna Purnima · fire at night, colour the next morning',
  daysHeading: 'दो दिन · Two days',
  monthLabel: 'Phalguna',
  book: 'holi-site',
  title: 'Holi (site)',
  kind: 'Holi days',
  mapZoom: 6,
  introduction: {
    title: 'होली',
    titleEnglish: 'Holi — Holika Dahan, then colour',
    content: `होली फाल्गुन पूर्णिमा से बँधी है। रात होलिका दहन — प्रदोष में आग, जब पूर्णिमा रहे। अगली सुबह रंगवाली होली / धुलेंडी। दो दिन एक पर्व हैं; आग और रंग एक विधि नहीं।

भद्रा का विचार दहन की घड़ी तय करता है। पटाखे विधि नहीं। नगर के सूर्यास्त से जाँचें।`,
    contentEnglish: `Holi is bound to Phalguna Purnima. Night is Holika Dahan — a fire in pradosh while Purnima holds. Next morning is Rangwali Holi / Dhulendi. Two days, one festival; the fire and the colour are not one rite.

Bhadra decides the bonfire hour. Fireworks are not the vidhi. Check local sunset.`,
  },
  days: [
    {
      id: 1,
      name: 'Holika Dahan',
      nameHindi: 'होलिका दहन',
      tithi: 'Phalguna Purnima · pradosh',
      eventName: 'Holika Dahan',
      summary: 'The bonfire after sunset, once Bhadra has passed where the panchang asks. Prahlad’s katha is told at the fire.',
      summaryHindi: 'सूर्यास्त के बाद चिता, जहाँ पंचांग कहे भद्रा निकल चुकी हो। आग पर प्रह्लाद की कथा।',
    },
    {
      id: 2,
      name: 'Rangwali Holi',
      nameHindi: 'रंगवाली होली',
      tithi: 'Phalguna Purnima’s next morning',
      eventName: 'Holi',
      summary: 'Colour, water, and visits. In Braj this is a public play; in many homes it is a short courtyard hour, then a meal.',
      summaryHindi: 'रंग, जल, भेंट। ब्रज में सार्वजनिक क्रीड़ा; कई घरों में आँगन की छोटी घड़ी, फिर भोजन।',
    },
  ],
  deities: [
    {
      name: 'Narasimha / Vishnu',
      nameHindi: 'नरसिंह / विष्णु',
      note: 'The fire katha is Prahlad’s: Holika burns, the boy does not. Vishnu is the protector in that telling.',
      noteHindi: 'आग की कथा प्रह्लाद की है — होलिका जलती है, बालक नहीं। उस कथन में विष्णु रक्षक हैं।',
    },
    {
      name: 'Krishna and Radha',
      nameHindi: 'कृष्ण और राधा',
      note: 'The colour morning in Braj remembers Krishna. It is a second katha, not a rewrite of Holika.',
      noteHindi: 'ब्रज की रंग-सुबह कृष्ण याद करती है। दूसरी कथा है, होलिका का पुनर्लेख नहीं।',
    },
    {
      name: 'Holika',
      nameHindi: 'होलिका',
      note: 'Named at the fire. The pile is her pyre in the story, not a harvest bonfire without a name.',
      noteHindi: 'आग पर नाम। कथा में यह उसकी चिता है, बिना नाम की फसल-आग नहीं।',
    },
  ],
  kathaHeading: 'कथा · Two stories',
  kathaHindi:
    'हिरण्यकशिपु की बहन होलिका अग्नि-वस्त्र लेकर प्रह्लाद को गोद में बैठी; वस्त्र ने उसे जलाया, बालक बच गया। रास की दूसरी कथा: कृष्ण ने राधा और गोपियों पर रंग खेला। एक पूर्णिमा, दो स्मृतियाँ।',
  kathaEnglish:
    'Hiranyakashipu’s sister Holika sat with Prahlad in a fire-cloak; the cloak burned her, the boy lived. A second katha: Krishna played colour with Radha and the gopis. One Purnima, two memories.',
  history: [
    {
      layer: 'Spring fire',
      layerHindi: 'वसंत की आग',
      claim: 'Phalguna Purnima closes the cold; communities burn a pile before the colour day.',
      claimHindi: 'फाल्गुन पूर्णिमा शीत बंद करती है; रंग से पहले समाज ढेर जलाता है।',
      verdict: 'True as a living custom. It does not fix the Prahlad date.',
      verdictHindi: 'जीवित रीत है। प्रह्लाद की तिथि इससे नहीं मिलती।',
    },
    {
      layer: 'Purana katha',
      layerHindi: 'पुराण कथा',
      claim: 'Holika and Prahlad; Krishna’s play in Braj.',
      claimHindi: 'होलिका और प्रह्लाद; ब्रज में कृष्ण की क्रीड़ा।',
      verdict: 'These sanction the two days. They are not one historical first Holi.',
      verdictHindi: 'ये दो दिनों को आधार देते हैं। इतिहास की एक पहली होली नहीं।',
    },
    {
      layer: 'Regional mornings',
      layerHindi: 'क्षेत्र की सुबह',
      claim: 'Lathmar in Barsana, temple Holi in Mathura, a quiet gulal at home elsewhere.',
      claimHindi: 'बरसाना की लठमार, मथुरा की मंदिर होली, अन्यत्र घर की शांत गुलाल।',
      verdict: 'Same moon, different public form. Do not flatten them into one street fight.',
      verdictHindi: 'एक चन्द्र, भिन्न सार्वजनिक रूप। एक सड़क-लड़ाई में मिलाना ठीक नहीं।',
    },
  ],
  places: [
    {
      id: 1,
      name: 'Dwarkadhish / visram ghat',
      nameHindi: 'द्वारकाधीश / विश्राम घाट',
      location: 'Mathura',
      state: 'Uttar Pradesh',
      note: 'Braj’s town Holi. The colour is public; the fire the night before is still the first rite.',
      noteHindi: 'ब्रज की नगर होली। रंग सार्वजनिक; पहली विधि फिर भी पिछली रात की आग है।',
      coordinates: { lat: 27.5035, lng: 77.6844 },
    },
    {
      id: 2,
      name: 'Banke Bihari',
      nameHindi: 'बांके बिहारी',
      location: 'Vrindavan',
      state: 'Uttar Pradesh',
      note: 'Widow Holi and temple colour here are later public forms. Confirm the day’s enclosure and hours.',
      noteHindi: 'यहाँ विधवा होली और मंदिर रंग बाद के सार्वजनिक रूप हैं। दिन का घेरा और समय जाँचें।',
      coordinates: { lat: 27.5806, lng: 77.6973 },
    },
    {
      id: 3,
      name: 'Radha Rani',
      nameHindi: 'राधा रानी',
      location: 'Barsana',
      state: 'Uttar Pradesh',
      note: 'Lathmar Holi is a named play between Barsana and Nandgaon. It is not every town’s morning.',
      noteHindi: 'लठमार — बरसाना और नंदगाँव की नामित क्रीड़ा। प्रत्येक नगर की सुबह नहीं।',
      coordinates: { lat: 27.6486, lng: 77.3763 },
    },
    {
      id: 4,
      name: 'Ganga ghats',
      nameHindi: 'गंगा घाट',
      location: 'Varanasi',
      state: 'Uttar Pradesh',
      note: 'A home and ghat Holi. The fire is in the mohalla; the river is for the bath after.',
      noteHindi: 'घर और घाट की होली। आग मोहल्ले में; स्नान बाद में नदी पर।',
      coordinates: { lat: 25.3176, lng: 83.0104 },
    },
  ],
  practice: {
    puja: 'Build or join a small Holika pile. Light it in pradosh after Bhadra, as the local panchang says. Next morning play with colour if the house does, then bathe and eat. Offer the fire a grain of the winter store if that is the family custom.',
    pujaHindi:
      'छोटी होलिका बनाएँ या मोहल्ले की आग में बैठें। प्रदोष में, भद्रा बाद, पंचांग कहे तब जलाएँ। सुबह घर खेले तो रंग, फिर स्नान-भोजन। घर की रीत हो तो शीत का एक दाना आग को।',
    who: 'A household and mohalla rite. No priest is required. Braj towns keep multi-day public play around the same Purnima.',
    whoHindi: 'गृह और मोहल्ले की विधि। पुजारी अनिवार्य नहीं। ब्रज नगर उसी पूर्णिमा के आस पास कई दिन की सार्वजनिक क्रीड़ा रखते हैं।',
    care: 'Bhadra and pradosh are local. Keep children upwind of the fire. Natural colour stains less; chemical colour and forced play are not the vrata. Smoke and crowds need a clear exit.',
    careHindi:
      'भद्रा और प्रदोष स्थानीय हैं। बच्चों को आग की हवा से दूर। प्राकृतिक रंग कम दागता है; रासायनिक रंग और जबरदस्ती खेल व्रत नहीं। धुआँ और भीड़ — निकास साफ़।',
  },
  sources:
    'Drik Panchang festival lists (Delhi) for Holika Dahan and Holi 2025–2027; Prahlad-Holika katha; Braj colour custom. Confirm Bhadra and pradosh with a local panchang.',
}

export const holiDays = holiPage.days
export const holiIntroduction = holiPage.introduction

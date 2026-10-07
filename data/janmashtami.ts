import type { FestivalPage } from './festivalTypes'

export const janmashtamiPage: FestivalPage = {
  upcomingEventName: 'Janmashtami',
  tagline: 'Bhadrapada Krishna Ashtami · midnight birth, then Nandotsav',
  daysHeading: 'रात और सुबह · Night and morning',
  monthLabel: 'Bhadrapada',
  book: 'janmashtami-site',
  title: 'Janmashtami (site)',
  kind: 'Janmashtami days',
  mapZoom: 5,
  introduction: {
    title: 'जन्माष्टमी',
    titleEnglish: 'Janmashtami — Krishna’s birth night',
    content: `जन्माष्टमी भाद्रपद कृष्ण अष्टमी की रात है — उपवास, झूलता बाल-कृष्ण, और निशीथ के पास जन्म की घड़ी। मथुरा-वृंदावन में मंदिर जागरण है। दही हांडी महाराष्ट्र की सार्वजनिक रीत है, घर का व्रत नहीं।

अगली सुबह कई घर नंदोत्सव रखते हैं। तिथि रोहिणी और अष्टमी दोनों से जाँची जाती है — पंचांग से तय करें।`,
    contentEnglish: `Janmashtami is the night of Bhadrapada Krishna Ashtami — a fast, a child-Krishna in a swing, and the birth hour near nishita. Mathura and Vrindavan keep temple watches. Dahi Handi is Maharashtra’s public form, not the home vrata.

Many homes keep Nandotsav the next morning. The tithi is checked against both Ashtami and Rohini — use a panchang.`,
  },
  days: [
    {
      id: 1,
      name: 'The fast and the swing',
      nameHindi: 'व्रत और झूला',
      tithi: 'Bhadrapada Krishna Ashtami · day',
      eventName: 'Janmashtami',
      summary: 'The house fasts. A small Krishna is bathed, dressed, and set in a jhula. The bhajan desk is for the night, not the afternoon television.',
      summaryHindi: 'घर व्रत रखता है। छोटे कृष्ण को स्नान-वस्त्र, झूले पर। भजन की चौकी रात के लिए है, दोपहर के टीवी के लिए नहीं।',
    },
    {
      id: 2,
      name: 'Nishita / midnight',
      nameHindi: 'निशीथ / मध्यरात्रि',
      tithi: 'Bhadrapada Krishna Ashtami · midnight',
      eventName: 'Janmashtami',
      summary: 'The birth is marked at nishita. Conch, lamp, and a first offering. Then the fast is broken, as the family does.',
      summaryHindi: 'जन्म निशीथ पर। शंख, दीप, पहला नैवेद्य। फिर पारण — जैसा घर में चला आता है।',
    },
    {
      id: 3,
      name: 'Dahi Handi',
      nameHindi: 'दही हांडी',
      tithi: 'Same tithi · Maharashtra public form',
      eventName: 'Janmashtami',
      summary: 'Govinda pathaks break a pot in the street. A late city custom around the same Ashtami. It is not required at home.',
      summaryHindi: 'गोविंदा पाठक गली में मटकी तोड़ते हैं। उसी अष्टमी के आस पास नगर की बाद की रीत। घर में अनिवार्य नहीं।',
    },
    {
      id: 4,
      name: 'Nandotsav',
      nameHindi: 'नंदोत्सव',
      tithi: 'The morning after',
      offsetFrom: 'Janmashtami',
      offsetDays: 1,
      summary: 'Nanda’s house celebrates the child. Sweets, a short swing again, and guests. The night vrata is over.',
      summaryHindi: 'नंद के घर बालक का उत्सव। मिष्ठान्न, फिर छोटा झूला, अतिथि। रात का व्रत पूरा।',
    },
  ],
  deities: [
    {
      name: 'Krishna',
      nameHindi: 'कृष्ण',
      note: 'This night he is the child in prison and the child in Gokul — not the Gita’s charioteer.',
      noteHindi: 'इस रात वे कारागार और गोकुल के बालक हैं — गीता के सारथि नहीं।',
    },
    {
      name: 'Devaki and Vasudeva',
      nameHindi: 'देवकी और वसुदेव',
      note: 'The parents of the katha. The crossing of the Yamuna is their night walk.',
      noteHindi: 'कथा के माता-पिता। यमुना पार उनकी रात की चाल है।',
    },
    {
      name: 'Yashoda and Nanda',
      nameHindi: 'यशोदा और नंद',
      note: 'The foster house that receives the child. Nandotsav is their morning.',
      noteHindi: 'पालक घर जो बालक लेता है। नंदोत्सव उनकी सुबह है।',
    },
  ],
  kathaHeading: 'कथा · The prison and the river',
  kathaHindi:
    'कंस की कारा में देवकी-वसुदेव से कृष्ण जन्मे। वसुदेव उन्हें यमुना पार गोकुल ले गए; यशोदा सोई रहीं। कंस की हत्या बाद की कथा है — यह रात जन्म की है, युद्ध की नहीं।',
  kathaEnglish:
    'Krishna is born to Devaki and Vasudeva in Kansa’s prison. Vasudeva carries him across the Yamuna to Gokul; Yashoda sleeps. The slaying of Kansa is a later katha — this night is the birth, not the war.',
  history: [
    {
      layer: 'Night fast',
      layerHindi: 'रात का व्रत',
      claim: 'Ashtami plus Rohini marks the birth hour; homes keep a swing and a midnight offering.',
      claimHindi: 'अष्टमी और रोहिणी जन्म घड़ी तय करती हैं; घर झूला और मध्यरात्रि नैवेद्य रखते हैं।',
      verdict: 'True as a living vrata. It does not fix a historical birth certificate.',
      verdictHindi: 'जीवित व्रत है। इतिहास का जन्म-प्रमाण इससे नहीं मिलता।',
    },
    {
      layer: 'Bhagavata katha',
      layerHindi: 'भागवत कथा',
      claim: 'Bhagavata Purana tenth skandha: prison, Yamuna, Gokul.',
      claimHindi: 'भागवत दशम स्कंध: कारा, यमुना, गोकुल।',
      verdict: 'This sanctions the night. It is not a dated first Janmashtami fair.',
      verdictHindi: 'यह रात को आधार देता है। इतिहास का पहला जनमाष्टमी मेला नहीं।',
    },
    {
      layer: 'Regional mornings',
      layerHindi: 'क्षेत्र की सुबह',
      claim: 'Temple watches in Braj; Dahi Handi in Mumbai; a quiet jhula elsewhere.',
      claimHindi: 'ब्रज में मंदिर जागरण; मुंबई में दही हांडी; अन्यत्र शांत झूला।',
      verdict: 'Same Ashtami, different public form. Do not flatten them into one pot-break.',
      verdictHindi: 'एक अष्टमी, भिन्न सार्वजनिक रूप। एक मटकी में मिलाना ठीक नहीं।',
    },
  ],
  places: [
    {
      id: 1,
      name: 'Krishna Janmabhoomi',
      nameHindi: 'कृष्ण जन्मभूमि',
      location: 'Mathura',
      state: 'Uttar Pradesh',
      note: 'The town keeps the prison katha. Security and hours change — check before the night.',
      noteHindi: 'नगर कारा-कथा रखता है। सुरक्षा और समय बदलते हैं — रात से पहले जाँचें।',
      coordinates: { lat: 27.5046, lng: 77.6696 },
    },
    {
      id: 2,
      name: 'Nandgaon / Gokul',
      nameHindi: 'नंदगाँव / गोकुल',
      location: 'Gokul',
      state: 'Uttar Pradesh',
      note: 'The receiving house in the katha. Nandotsav is louder here than the midnight hour.',
      noteHindi: 'कथा का ग्रहण-घर। यहाँ नंदोत्सव मध्यरात्रि से ऊँचा है।',
      coordinates: { lat: 27.439, lng: 77.72 },
    },
    {
      id: 3,
      name: 'Dwarkadhish',
      nameHindi: 'द्वारकाधीश',
      location: 'Dwarka',
      state: 'Gujarat',
      note: 'The later city of the adult Krishna. The night is still Ashtami; the murti is the king, not the infant.',
      noteHindi: 'वयस्क कृष्ण का बाद का नगर। रात फिर भी अष्टमी; मूर्ति राजा है, शिशु नहीं।',
      coordinates: { lat: 22.2376, lng: 68.9674 },
    },
    {
      id: 4,
      name: 'Girgaon / Dadar mandals',
      nameHindi: 'गिरगाव / दादर मंडल',
      location: 'Mumbai',
      state: 'Maharashtra',
      note: 'Dahi Handi streets. A public sport around the Ashtami, not the Mathura prison watch.',
      noteHindi: 'दही हांडी की गलियाँ। अष्टमी के आस पास सार्वजनिक खेल, मथुरा की कारा-जागरण नहीं।',
      coordinates: { lat: 18.9543, lng: 72.817 },
    },
  ],
  practice: {
    puja: 'Fast if you can. Bathe the child-murti, offer milk, tulsi, and butter. Sit until nishita. Blow a conch, offer the first prasad, then eat. Keep Nandotsav in the morning if the house does.',
    pujaHindi:
      'सकें तो व्रत। बाल-मूर्ति स्नान, दूध, तुलसी, मक्खन। निशीथ तक बैठें। शंख, पहला प्रसाद, फिर भोजन। घर करे तो सुबह नंदोत्सव।',
    who: 'A household vrata. No priest is required. Braj temples and Mumbai mandals are community work.',
    whoHindi: 'गृह-व्रत। पुजारी अनिवार्य नहीं। ब्रज मंदिर और मुंबई मंडल समाज का काम हैं।',
    care: 'Nishita and Rohini are local. Children and the ill should eat. Dahi Handi pyramids injure — it is optional sport. Temple crowds need water and a meeting point.',
    careHindi:
      'निशीथ और रोहिणी स्थानीय हैं। बच्चे और रोगी खाएँ। दही हांडी की पिरामिड चोट देती है — ऐच्छिक खेल है। मंदिर की भीड़ में जल और मिलने का स्थान।',
  },
  sources:
    'Drik Panchang festival lists (Delhi) for Janmashtami 2025–2027; Bhagavata tenth skandha prison-Yamuna katha; Nandotsav and Dahi Handi as regional forms. Confirm Ashtami and Rohini with a local panchang.',
}

export const janmashtamiDays = janmashtamiPage.days
export const janmashtamiIntroduction = janmashtamiPage.introduction

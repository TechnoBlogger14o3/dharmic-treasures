export interface ChhathDay {
  id: number
  name: string
  nameHindi: string
  tithi: string
  summary: string
  summaryHindi: string
}

export interface ChhathPlace {
  id: number
  name: string
  nameHindi: string
  location: string
  state: string
  country: string
  note: string
  noteHindi: string
  coordinates: { lat: number; lng: number }
}

export const chhathIntroduction = {
  title: 'छठ पूजा',
  titleEnglish: 'Chhath Puja — Surya Shashthi',
  content: `छठ पूर्वांचल का सबसे कठिन और सबसे समान व्रत है। सूर्य देव और छठी मैया को बिना मूर्ति और बिना पुजारी के, नदी या तालाब में खड़े होकर अर्घ्य दिया जाता है — पहले अस्त होते सूर्य को, फिर उदित होते सूर्य को।

नाम संस्कृत षष्ठी से आया है — कार्तिक शुक्ल षष्ठी, दीपावली के छह दिन बाद। चैत्र में चैती छठ भी मनाई जाती है। व्रती के नियम सबके लिए एक हैं; फल मौसमी और स्थानीय होते हैं — ठेकुआ, गन्ना, केला, नारियल।`,
  contentEnglish: `Chhath is the hardest and most equal vrat of Purvanchal. Surya and Chhathi Maiya are offered arghya with no murti and no hired priest: the vrati stands in a river or tank, first to the setting sun, then to the rising sun.

The name is from Sanskrit shashthi — Kartik Shukla Shashthi, six days after Diwali. A spring cycle, Chaiti Chhath, is kept in Chaitra. The rules do not change with wealth. Offerings are seasonal and local: thekua, sugarcane, banana, coconut.`,
}

export const chhathDays: ChhathDay[] = [
  {
    id: 1,
    name: 'Nahay Khay',
    nameHindi: 'नहाय-खाय',
    tithi: 'Kartik Shukla Chaturthi',
    summary:
      'Bath in a river or pond. One sattvic meal — often bottle gourd or pumpkin, chana dal, rice, sendha namak. Kitchen purity begins. Water from the ghat may set the chulha for the rest of the vrat.',
    summaryHindi:
      'नदी या तालाब में स्नान। एक सात्त्विक भोजन — प्रायः लौकी या कद्दू, चना दाल, भात, सेंधा नमक। रसोई की शुद्धि इसी दिन से। घाट का जल चूल्हे के लिए लाया जा सकता है।',
  },
  {
    id: 2,
    name: 'Kharna / Lohanda',
    nameHindi: 'खरना / लोहंडा',
    tithi: 'Kartik Shukla Panchami',
    summary:
      'Day-long fast. After sunset: gur-kheer and roti offered to Chhathi Maiya, then eaten once. Thekua is often fried this day. After this meal the roughly 36-hour nirjala fast begins.',
    summaryHindi:
      'दिन भर का उपवास। सूर्यास्त के बाद गुड़ की खीर और रोटी छठी मैया को अर्पित कर एक बार खाई जाती है। ठेकुआ प्रायः इसी दिन बनता है। इसके बाद लगभग छत्तीस घंटे का निर्जला व्रत।',
  },
  {
    id: 3,
    name: 'Sandhya Arghya',
    nameHindi: 'संध्या अर्घ्य',
    tithi: 'Kartik Shukla Shashthi',
    summary:
      'The heart of Chhath. The family carries the soop and daura to the ghat. The vrati stands in water and offers arghya to the setting sun. Night of Chhath geet; no food or water.',
    summaryHindi:
      'छठ का हृदय। परिवार सूप और दउरा घाट ले जाता है। व्रती जल में खड़े होकर अस्त सूर्य को अर्घ्य देते हैं। रात छठ गीत की; अन्न-जल नहीं।',
  },
  {
    id: 4,
    name: 'Usha Arghya & Parana',
    nameHindi: 'उषा अर्घ्य और पारण',
    tithi: 'Saptami dawn',
    summary:
      'Return before sunrise. Arghya to the rising sun. The fast is broken at the bank with prasad, ginger, and water. Prasad is shared; elders bless the vrati.',
    summaryHindi:
      'सूर्योदय से पहले घाट लौटना। उदित सूर्य को अर्घ्य। घाट पर प्रसाद, अदरक और जल से पारण। प्रसाद बाँटा जाता है; बड़े आशीर्वाद देते हैं।',
  },
]

export const chhathDeities = [
  {
    name: 'Surya / Aditya',
    nameHindi: 'सूर्य / आदित्य',
    note: 'The visible sun. Arghya is offered to his setting and rising face. No image is required.',
    noteHindi: 'प्रत्यक्ष सूर्य। अस्त और उदय दोनों को अर्घ्य। मूर्ति की आवश्यकता नहीं।',
  },
  {
    name: 'Usha & Pratyusha',
    nameHindi: 'उषा और प्रत्यूषा',
    note: 'Dawn-light and dusk-light — why the vrat has two arghyas, dusk first.',
    noteHindi: 'उषा का प्रकाश और संध्या का प्रकाश — इसलिए दो अर्घ्य, पहले संध्या।',
  },
  {
    name: 'Chhathi Maiya / Shashthi',
    nameHindi: 'छठी मैया / षष्ठी',
    note: 'Folk mother of the sixth day; protector of children. Same “sixth” as the festival name and the rite after a birth.',
    noteHindi: 'षष्ठी की लोकमाता; बच्चों की रक्षिका। जन्म के छठे दिन की छठी और कार्तिक की छठ एक ही मैया।',
  },
  {
    name: 'Devasena / Sun’s sister',
    nameHindi: 'देवसेना / सूर्य की बहिन',
    note: 'Some kathas call her Devasena; some speakers call her the Sun’s sister, daughter of Kashyapa and Aditi. Families do not argue this at the ghat.',
    noteHindi: 'कुछ कथाओं में देवसेना; कुछ घरों में सूर्य की बहिन, कश्यप-अदिति की पुत्री। घाट पर एक ही सम्बोधन है।',
  },
]

export const chhathHistory = [
  {
    layer: 'Nature',
    layerHindi: 'प्रकृति',
    claim: 'People have always thanked the sun for crop and life.',
    claimHindi: 'फसल और जीवन के लिए सूर्य का धन्यवाद सनातन है।',
    verdict:
      'True as a motive. It does not date today’s four-day Chhath.',
    verdictHindi: 'भाव सही है। आज की चार-दिवसीय छठ को इससे तिथि नहीं मिलती।',
  },
  {
    layer: 'Sun cult of Magadh',
    layerHindi: 'मगध का सूर्य-पंथ',
    claim: 'Rigveda hymns to Surya; Gupta-era Magadh sun temples; Samba Purana.',
    claimHindi: 'ऋग्वेद के सूर्य सूक्त; गुप्तकालीन मगध के सूर्य मंदिर; साम्ब पुराण।',
    verdict:
      'Sun worship in this land is ancient. Present-day Chhath is not a documented Vedic vidhi. Ethnographer Rana P. B. Singh (2009) found no direct line from Vedic ritual to today’s Chhatha, though both seek household prosperity.',
    verdictHindi:
      'इस भूमि पर सूर्य-पूजा प्राचीन है। आज की छठ को वैदिक विधि कहना प्रमाणित नहीं। सिंह (२००९) कहते हैं वर्तमान छठ का वैदिक यज्ञ से सीधा सम्बन्ध नहीं, यद्यपि दोनों गृह-समृद्धि चाहते हैं।',
  },
  {
    layer: 'Epic katha',
    layerHindi: 'महाकाव्य कथा',
    claim: 'Sita and Rama after Lanka; Karna’s Surya worship; Draupadi and Dhaumya in exile — all on Kartik Shashthi.',
    claimHindi: 'लंका के बाद सीता-राम; कर्ण की सूर्य-पूजा; वन में द्रौपदी और धौम्य — सब कार्तिक षष्ठी पर।',
    verdict:
      'Living sacred stories that sanction the vrat. They are not a dated “first Chhath” in the historical sense. Munger lore points to Sita Charan Mandir.',
    verdictHindi:
      'जीवित कथाएँ जो व्रत को आधार देती हैं। इतिहास की “पहली छठ” नहीं। मुंगेर में सीता चरण मंदिर की लोकश्रुति है।',
  },
]

export const chhathKathaHindi = `राजा प्रियव्रत और रानी मालिनी पुत्र चाहते थे। पुत्रकामेष्टि से हवन-कुण्ड में खीर प्रकट हुई। रानी गर्भवती हुईं, पर शिशु मृत जन्मा। नदी पर आत्महत्या रोकने वाली स्त्री ने स्वयं को देवसेना / षष्ठी कहा और सूर्य सहित अपनी पूजा माँगी। जीवित पुत्र मिला। इसलिए छठ संतान और उनकी रक्षा के लिए माँगी जाती है।`

export const chhathKathaEnglish = `King Priyavrat and Queen Malini wanted a child. A putrakameshti yielded kheer from the fire. The queen conceived; the child was stillborn. At the river a woman stopped her suicide, named herself Devasena / Shashthi, and asked to be worshipped with the Sun. A living child followed. That is why Chhath is asked for children, and why Chhathi Maiya protects them.`

export const chhathPlaces: ChhathPlace[] = [
  {
    id: 1,
    name: 'Gandhi Ghat',
    nameHindi: 'गाँधी घाट',
    location: 'Patna',
    state: 'Bihar',
    country: 'India',
    note: 'The Ganga ghat the country sees each Kartik. The whole mohalla works: roads, soops, thekua, returning migrants.',
    noteHindi: 'कार्तिक में देश जिसे देखता है — पटना का गंगा घाट। मोहल्ला साफ़ करता है, सूप-ठेकुआ आता है, प्रवासी घर लौटते हैं।',
    coordinates: { lat: 25.6208, lng: 85.172 },
  },
  {
    id: 2,
    name: 'Deo Surya Mandir',
    nameHindi: 'देव सूर्य मंदिर',
    location: 'Deo, Aurangabad',
    state: 'Bihar',
    country: 'India',
    note: 'West-facing Surya shrine with Surya Kund. Unusual: the door looks to the setting sun. Kartik and Chaiti Chhath both draw large gatherings.',
    noteHindi: 'पश्चिमाभिमुख सूर्य मंदिर और सूर्य कुण्ड। द्वार अस्त सूर्य की ओर। कार्तिक और चैती छठ दोनों पर भीड़।',
    coordinates: { lat: 24.6588, lng: 84.437 },
  },
  {
    id: 3,
    name: 'Dakshinaarka',
    nameHindi: 'दक्षिणार्क',
    location: 'Gaya',
    state: 'Bihar',
    country: 'India',
    note: 'Historic Surya temple in a city already a tirtha for pinda and sun. Part of Magadh’s older sun geography.',
    noteHindi: 'गया के ऐतिहासिक सूर्य मंदिर — पिण्ड और सूर्य दोनों के तीर्थ। मगध की पुरानी सूर्य-भूमि।',
    coordinates: { lat: 24.788, lng: 85.0006 },
  },
]

export const chhathPractice = {
  soop: 'Bamboo soop (winnow) and daura. Thekua of wheat, gur or sugar, and ghee. Kasar. Whole sugarcane. Banana, coconut, sweet potato, singhara, chakotra. Diya, sindoor, kalash. Family pours milk or water over the soop as the vrati lifts it to the sun.',
  soopHindi:
    'बाँस का सूप और दउरा। गेहूँ, गुड़ या चीनी, घी का ठेकुआ। कसार। पूरा गन्ना। केला, नारियल, शकरकंद, सिंघाड़ा, चकोतरा। दीया, सिन्दूर, कलश। व्रती सूप उठाते हैं तो परिवार दूध या जल डालता है।',
  who: 'Socially women-led, because Maiya protects children, but men keep the vrat too. The ghat is a family and mohalla event. No priest is required.',
  whoHindi:
    'सामाजिक रूप से नारियों के हाथ में — मैया बच्चों की रक्षिका हैं — पर पुरुष भी व्रत रखते हैं। घाट परिवार और मोहल्ले का है। पुजारी अनिवार्य नहीं।',
  care: 'The full nirjala stretch is severe. Pregnant, ill, elderly, or medically advised vratis commonly keep a gentler form. The sankalpa matters more than collapse.',
  careHindi:
    'पूरा निर्जला कठिन है। गर्भवती, रोगी, वृद्ध या चिकित्सक की सलाह पर जल या फल से कोमल रूप रखा जाता है। संकल्प गिरने से बड़ा है।',
}

export const chhathSources =
  'Indian Express Explained (Yashee, Nov 2024); Times of India / Jayadeo Mishra on Magadh sun worship; Rana P. B. Singh, Man in India (2009); Sahapedia on the Devasena katha; Shashthi folk tradition; Bihar Tourism on Deo Surya Mandir. Kartik civil dates follow published panchangs (India) through 2034 — confirm sunrise and sunset locally.'

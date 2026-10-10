import type { FestivalPage } from './festivalTypes.ts'

export const ganeshChaturthiPage: FestivalPage = {
  upcomingEventName: 'Ganesh Chaturthi',
  tagline: 'Bhadrapada Shukla Chaturthi · sthapana, then visarjan',
  daysHeading: 'स्थापना से विसर्जन · From installation to immersion',
  monthLabel: 'Bhadrapada',
  book: 'ganesh-site',
  title: 'Ganesh Chaturthi (site)',
  kind: 'Ganeshotsav days',
  mapZoom: 5,
  introduction: {
    title: 'गणेश चतुर्थी',
    titleEnglish: 'Ganesh Chaturthi — bringing Ganesha home',
    content: `गणेश चतुर्थी भाद्रपद शुक्ल चतुर्थी पर मूर्ति की स्थापना है। घर एक, तीन, पाँच, सात या दस दिन रखते हैं। दसवीं अनंत चतुर्दशी पर बहुत से मंडल विसर्जन करते हैं। सार्वजनिक गणेशोत्सव तिलक के बाद की नगर-रीत है; घर का व्रत उससे पुराना है।

चन्द्र दर्शन की निषेध-कथा चतुर्थी से बँधी है — परिवार की रीत देखें।`,
    contentEnglish: `Ganesh Chaturthi is the installation on Bhadrapada Shukla Chaturthi. Homes keep one, three, five, seven, or ten days. Many mandals immerse on Anant Chaturdashi, the tenth. The public Ganeshotsav is a city custom after Tilak; the home vrata is older.

A caution against viewing the moon sits on this Chaturthi — follow the family’s rule.`,
  },
  days: [
    {
      id: 1,
      name: 'Sthapana',
      nameHindi: 'स्थापना',
      tithi: 'Bhadrapada Shukla Chaturthi',
      eventName: 'Ganesh Chaturthi',
      summary: 'The murti is brought in, pranapratishtha if the house does, and the first modak. Clay is kinder to the river than plaster.',
      summaryHindi: 'मूर्ति आती है, घर करे तो प्राणप्रतिष्ठा, पहला मोदक। नदी के लिए मिट्टी प्लास्टर से भली।',
    },
    {
      id: 2,
      name: 'The middle days',
      nameHindi: 'बीच के दिन',
      tithi: 'Bhadrapada Shukla · 1.5 to 9 days',
      offsetFrom: 'Ganesh Chaturthi',
      offsetDays: 2,
      summary: 'Daily lamp, durva, and a simple meal for guests. Public mandals keep music and queues. 1.5-, 5-, and 7-day visarjans fall in this stretch.',
      summaryHindi: 'प्रतिदिन दीप, दूर्वा, अतिथि का सादा भोजन। सार्वजनिक मंडल संगीत और पंक्ति रखते हैं। डेढ़, पाँच, सात दिन के विसर्जन इसी बीच।',
    },
    {
      id: 3,
      name: 'Anant Chaturdashi',
      nameHindi: 'अनंत चतुर्दशी',
      tithi: 'Bhadrapada Shukla Chaturdashi',
      eventName: 'Anant Chaturdashi',
      summary: 'The common tenth-day visarjan. Also Vishnu’s Anant vrata. The pot and the procession are the city’s closing, not every home’s.',
      summaryHindi: 'सामान्य दसवें दिन का विसर्जन। विष्णु का अनंत व्रत भी। घड़ा और जुलूस नगर की समाप्ति हैं, प्रत्येक घर की नहीं।',
    },
  ],
  deities: [
    {
      name: 'Ganesha',
      nameHindi: 'गणेश',
      note: 'Vighnaharta in the house for these days. The clay form is a guest, then returned to water.',
      noteHindi: 'इन दिनों घर में विघ्नहर्ता। मिट्टी का रूप अतिथि है, फिर जल को लौटाया जाता है।',
    },
    {
      name: 'Parvati',
      nameHindi: 'पार्वती',
      note: 'The maker in the katha. Gauri is kept beside him in some Deccan homes.',
      noteHindi: 'कथा में बनाने वाली। दक्खिन के कुछ घरों में गौरी पास बैठती हैं।',
    },
    {
      name: 'Ananta / Vishnu',
      nameHindi: 'अनंत / विष्णु',
      note: 'Anant Chaturdashi is also Vishnu’s fourteen-knot thread. Two rites can share the visarjan day.',
      noteHindi: 'अनंत चतुर्दशी विष्णु के चौदह गाँठ के धागे की भी है। दो विधियाँ विसर्जन दिन साझा कर सकती हैं।',
    },
  ],
  kathaHeading: 'कथा · Two makings',
  kathaHindi:
    'पार्वती ने अपने अंग की मैल से गणेश बनाए; शिव ने मस्तक काटा, हाथी का सिर दिया। सार्वजनिक उत्सव दूसरी कथा है — १८९३ के आस पास तिलक ने घर की मूर्ति को चौक पर लाया। दोनों एक “पहली चतुर्थी” नहीं।',
  kathaEnglish:
    'Parvati forms Ganesha from the dirt of her body; Shiva beheads him and sets an elephant head. The public festival is another story — around 1893 Tilak brought the home murti into the square. They are not one dated “first Chaturthi”.',
  history: [
    {
      layer: 'Home guest',
      layerHindi: 'घर का अतिथि',
      claim: 'A clay Ganesha sits a few days, then returns to a well, tank, or sea.',
      claimHindi: 'मिट्टी का गणेश कुछ दिन बैठता है, फिर कुएँ, तालाब या समुद्र को लौटता है।',
      verdict: 'True as a living vrata. It does not need a mandal loudspeaker.',
      verdictHindi: 'जीवित व्रत है। मंडल के लाउडस्पीकर की ज़रूरत नहीं।',
    },
    {
      layer: 'Purana katha',
      layerHindi: 'पुराण कथा',
      claim: 'Parvati, the beheading, the elephant head; also the Anant thread.',
      claimHindi: 'पार्वती, शिरच्छेद, गज-मुख; अनंत सूत्र भी।',
      verdict: 'These sanction the days. They are not a historical first sthapana certificate.',
      verdictHindi: 'ये दिनों को आधार देते हैं। इतिहास का पहला स्थापना-प्रमाण नहीं।',
    },
    {
      layer: 'Public Ganeshotsav',
      layerHindi: 'सार्वजनिक गणेशोत्सव',
      claim: 'Tilak’s sarvajanik festival; Lalbaug and Kasba as later city seats.',
      claimHindi: 'तिलक का सार्वजनिक उत्सव; लालबाग और कासबा बाद की नगर गद्दी।',
      verdict: 'A modern public form on an older home tithi. Do not call the square the original rite.',
      verdictHindi: 'पुरानी घर-तिथि पर नया सार्वजनिक रूप। चौक को मूल विधि मत कहें।',
    },
  ],
  places: [
    {
      id: 1,
      name: 'Kasba Ganpati',
      nameHindi: 'कासबा गणपति',
      location: 'Pune',
      state: 'Maharashtra',
      note: 'Among Pune’s manache ganpati. The town’s public order of visarjan starts here in common talk.',
      noteHindi: 'पुणे के मानाचे गणपति में। नगर के विसर्जन क्रम की बात यहीं से शुरू होती है।',
      coordinates: { lat: 18.519, lng: 73.855 },
    },
    {
      id: 2,
      name: 'Lalbaugcha Raja',
      nameHindi: 'लालबागचा राजा',
      location: 'Mumbai',
      state: 'Maharashtra',
      note: 'A twentieth-century mandal that the cameras treat as the city’s face. The home clay is still the older rite.',
      noteHindi: 'बीसवीं सदी का मंडल जिसे कैमरा नगर का मुख मानता है। घर की मिट्टी फिर भी पुरानी विधि है।',
      coordinates: { lat: 18.9909, lng: 72.8366 },
    },
    {
      id: 3,
      name: 'Siddhivinayak',
      nameHindi: 'सिद्धिविनायक',
      location: 'Mumbai',
      state: 'Maharashtra',
      note: 'A standing temple, not a ten-day guest. The Chaturthi queue is extra; the year-round murti is the shrine.',
      noteHindi: 'स्थायी मंदिर, दस दिन का अतिथि नहीं। चतुर्थी की पंक्ति अतिरिक्त है; वर्ष भर की मूर्ति ही स्थान है।',
      coordinates: { lat: 19.0169, lng: 72.8309 },
    },
    {
      id: 4,
      name: 'Mandovi / Campal',
      nameHindi: 'मांडवी / कैम्पल',
      location: 'Panaji',
      state: 'Goa',
      note: 'Goa immerses into the river with its own bands and dates. Same Chaturthi, another public form.',
      noteHindi: 'गोवा नदी में विसर्जन — अपनी बैंजो और तिथियाँ। वही चतुर्थी, भिन्न सार्वजनिक रूप।',
      coordinates: { lat: 15.4989, lng: 73.8278 },
    },
  ],
  practice: {
    puja: 'Install a clay murti on Chaturthi if the tithi holds in the morning. Offer durva (21 or 108), modak, and a lamp each day you keep him. On visarjan, circle the house, thank the guest, and release the clay into water that can take it. A bucket at home is kinder than a choked lake.',
    pujaHindi:
      'सुबह तिथि रहे तो चतुर्थी पर मिट्टी की मूर्ति। दूर्वा (२१ या १०८), मोदक, प्रतिदिन दीप। विसर्जन पर घर की प्रदक्षिणा, अतिथि को धन्यवाद, जल में विसर्जन जो ले सके। घर की बाल्टी भरे तालाब से भली।',
    who: 'A household vrata and, in Maharashtra and Goa, a public mandal. No priest is required at home.',
    whoHindi: 'गृह-व्रत; महाराष्ट्र और गोवा में सार्वजनिक मंडल भी। घर में पुजारी अनिवार्य नहीं।',
    care: 'Visarjan day varies by vow (1.5 to 10). Plaster and paint poison the water; choose clay. Crowds and immersion ghats need a meeting point. The moon-sight caution is a family rule, not a traffic law.',
    careHindi:
      'विसर्जन व्रत के दिन से है (डेढ़ से दस)। प्लास्टर और रंग जल बिगाड़ते हैं; मिट्टी चुनें। भीड़ और घाट — मिलने का स्थान। चन्द्र-दर्शन निषेध घर की रीत है, यातायात नियम नहीं।',
  },
  sources:
    'Drik Panchang festival lists (Delhi) for Ganesh Chaturthi and Anant Chaturdashi 2025–2027; Parvati-Ganesha katha; Tilak-era sarvajanik Ganeshotsav as a later public form. Confirm sthapana and visarjan with a local panchang.',
}

export const ganeshChaturthiDays = ganeshChaturthiPage.days
export const ganeshChaturthiIntroduction = ganeshChaturthiPage.introduction

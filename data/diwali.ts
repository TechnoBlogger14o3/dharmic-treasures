export interface DiwaliDay {
  id: number
  name: string
  nameHindi: string
  eventName: string | null
  tithi: string
  summary: string
  summaryHindi: string
}

export const diwaliIntroduction = {
  title: 'दीपावली',
  titleEnglish: 'Diwali — the festival of lights',
  content: `दीपावली कार्तिक अमावस्या की रात है — घर में दीप, लक्ष्मी-गणेश की पूजा, और अयोध्या में राम की वापसी की स्मृति। उत्तर भारत में पाँच दिन चलती है: धनतेरस से भाड्डीज तक। बंगाल में उसी अमावस्या पर काली पूजा होती है। व्यापारी इसी रात नया बही-खाता खोलते हैं।

यह पृष्ठ विधि और कथा का संक्षिप्त स्मरण है। लक्ष्मी पूजा का मुहूर्त प्रदोष काल पर नगर के सूर्यास्त से बँधा है — पंचांग से जाँचें।`,
  contentEnglish: `Diwali is the night of Kartik Amavasya — lamps at home, Lakshmi and Ganesha, and the memory of Rama’s return to Ayodhya. In North India it runs five days, from Dhanteras to Bhai Dooj. Bengal keeps Kali Puja on the same amavasya. Many ledgers open that night.

This page is a short vidhi and katha. Lakshmi Puja sits in pradosh kaal after local sunset. Check the panchang for your city.`,
}

export const diwaliDays: DiwaliDay[] = [
  {
    id: 1,
    name: 'Dhanteras',
    nameHindi: 'धनतेरस',
    eventName: 'Dhanteras',
    tithi: 'Kartik Krishna Trayodashi',
    summary:
      'Dhanvantari and Lakshmi. Families buy metal, a lamp, or a small utensil. Yamadeep is lit at the door, facing south.',
    summaryHindi:
      'धन्वन्तरि और लक्ष्मी। धातु, दीपक या छोटा बर्तन लाया जाता है। द्वार पर यमदीप, मुख दक्षिण की ओर।',
  },
  {
    id: 2,
    name: 'Choti Diwali',
    nameHindi: 'छोटी दीवाली',
    eventName: null,
    tithi: 'Kartik Krishna Chaturdashi',
    summary:
      'Naraka Chaturdashi. Oil bath before sunrise in many homes. Houses are cleaned; first lamps go up. Kali Puja preparations begin in Bengal.',
    summaryHindi:
      'नरक चतुर्दशी। कई घरों में सूर्योदय से पहले अभ्यंग स्नान। घर साफ़; पहले दीप। बंगाल में काली पूजा की तैयारी।',
  },
  {
    id: 3,
    name: 'Lakshmi Puja',
    nameHindi: 'लक्ष्मी पूजा',
    eventName: 'Diwali',
    tithi: 'Kartik Amavasya',
    summary:
      'The main night. Ganesha and Lakshmi at pradosh, after sunset, while Amavasya still holds. Every room gets a diya. Fireworks are a late custom, not the rite.',
    summaryHindi:
      'मुख्य रात। सूर्यास्त के बाद प्रदोष में गणेश-लक्ष्मी, जब अमावस्या रहे। प्रत्येक कक्ष में दीया। पटाखे बाद की रीत हैं, विधि नहीं।',
  },
  {
    id: 4,
    name: 'Govardhan / Annakut',
    nameHindi: 'गोवर्धन / अन्नकूट',
    eventName: 'Govardhan Puja',
    tithi: 'Kartik Shukla Pratipada',
    summary:
      'Krishna lifting Govardhan; a hill of vegetarian food. In some years the tithi spills past noon, so the civil day may be the next morning. Follow your family’s panchang.',
    summaryHindi:
      'गोवर्धन धारण; शाकाहारी अन्न का टीला। कुछ वर्षों में तिथि दोपहर बाद तक रहती है, तो नागरिक दिन अगली सुबह हो सकता है। घर के पंचांग से तय करें।',
  },
  {
    id: 5,
    name: 'Bhai Dooj',
    nameHindi: 'भाई दूज',
    eventName: 'Bhai Dooj',
    tithi: 'Kartik Shukla Dwitiya',
    summary:
      'Sister applies tilak; brother offers a gift. The five-day house festival closes. Some regions keep it a day earlier if Dwitiya is short.',
    summaryHindi:
      'बहन टीका लगाती है; भाई भेंट देता है। पाँच दिन का गृह-पर्व यहीं पूरा। द्वितीया छोटी हो तो कुछ प्रदेश एक दिन पहले रखते हैं।',
  },
]

export const diwaliDeities = [
  {
    name: 'Lakshmi',
    nameHindi: 'लक्ष्मी',
    note: 'Wealth as order in the house — grain, accounts, and the lamp that stays lit.',
    noteHindi: 'घर की व्यवस्था रूपी लक्ष्मी — अन्न, खाता, और जलता दीप।',
  },
  {
    name: 'Ganesha',
    nameHindi: 'गणेश',
    note: 'Invoked first, so the night’s work has a beginning.',
    noteHindi: 'पहले गणेश — ताकि रात के काम का आरम्भ हो।',
  },
  {
    name: 'Rama',
    nameHindi: 'राम',
    note: 'Ayodhya’s lamps mark the return after Lanka. The katha of the North.',
    noteHindi: 'अयोध्या के दीप — लंका के बाद वापसी। उत्तर की कथा।',
  },
  {
    name: 'Kali',
    nameHindi: 'काली',
    note: 'Same amavasya in Bengal: Kali Puja, not Lakshmi as the main murti.',
    noteHindi: 'बंगाल में वही अमावस्या — काली पूजा; मुख्य मूर्ति लक्ष्मी नहीं।',
  },
]

export const diwaliKathaHindi =
  'वनवास के बाद राम, सीता और लक्ष्मण अयोध्या लौटे। नगर ने दीप जलाए। दूसरी कथा: कृष्ण ने नरकासुर का वध किया — नरक चतुर्दशी। तीसरी: इन्द्र के गर्व पर गोवर्धन। तीन कथाएँ एक पखवाड़े में बैठती हैं; एक “पहली दीवाली” नहीं बनतीं।'

export const diwaliKathaEnglish =
  'After the forest years Rama, Sita, and Lakshmana came home to Ayodhya. The city lit lamps. A second katha: Krishna slew Narakasura — Naraka Chaturdashi. A third: Govardhan against Indra’s pride. Three stories share one fortnight. They are not one dated “first Diwali”.'

export const diwaliHistory = [
  {
    layer: 'Harvest and accounts',
    layerHindi: 'फसल और खाता',
    claim: 'Kartik amavasya closes the monsoon books; traders open a new ledger.',
    claimHindi: 'कार्तिक अमावस्या पर वर्षा-काल के खाते बंद; नया बही-खाता।',
    verdict: 'True as a living custom (Chopda Pujan, Padwa). It does not fix the epic date.',
    verdictHindi: 'जीवित रीत है (चोपड़ा पूजन, पाडवा)। महाकाव्य की तिथि इससे नहीं मिलती।',
  },
  {
    layer: 'Epic katha',
    layerHindi: 'महाकाव्य कथा',
    claim: 'Rama’s coronation night; Krishna and Narakasura; Govardhan.',
    claimHindi: 'राम का राज्याभिषेक; कृष्ण और नरकासुर; गोवर्धन।',
    verdict: 'These sanction the days. They are not a single historical first lighting.',
    verdictHindi: 'ये दिनों को आधार देते हैं। इतिहास की एक “पहली दीवाली” नहीं।',
  },
  {
    layer: 'Regional nights',
    layerHindi: 'क्षेत्र की रात',
    claim: 'Kali Puja, Bandi Chhor Divas, and Nepal’s Tihar sit on or beside the same amavasya.',
    claimHindi: 'काली पूजा, बंदी छोड़ दिवस, नेपाल का तिहार — वही अमावस्या या उसके पास।',
    verdict: 'Same moon, different main deity. Do not flatten them into one rite.',
    verdictHindi: 'एक चन्द्र, भिन्न मुख्य देव। एक विधि में मिलाना ठीक नहीं।',
  },
]

export const diwaliPlaces = [
  {
    id: 1,
    name: 'Ram ki Paidi',
    nameHindi: 'राम की पैड़ी',
    location: 'Ayodhya',
    state: 'Uttar Pradesh',
    note: 'The Saryu ghat the country watches on this night. Deepotsav is a recent public form of an older home lamp.',
    noteHindi: 'इस रात देश जिसे देखता है — सरयू घाट। दीपोत्सव नया सार्वजनिक रूप है; घर का दीप पुराना है।',
    coordinates: { lat: 26.795, lng: 82.2 },
  },
  {
    id: 2,
    name: 'Kashi Vishwanath / ghats',
    nameHindi: 'काशी विश्वनाथ / घाट',
    location: 'Varanasi',
    state: 'Uttar Pradesh',
    note: 'Dev Deepawali is Kartik Purnima, not Amavasya. Home Diwali in Kashi is still the dark night.',
    noteHindi: 'देव दीपावली कार्तिक पूर्णिमा है, अमावस्या नहीं। काशी के घर की दीवाली फिर भी कृष्ण पक्ष की रात है।',
    coordinates: { lat: 25.3109, lng: 83.0107 },
  },
  {
    id: 3,
    name: 'Kalighat',
    nameHindi: 'कालीघाट',
    location: 'Kolkata',
    state: 'West Bengal',
    note: 'Kali Puja night. The same amavasya, a different main worship.',
    noteHindi: 'काली पूजा की रात। वही अमावस्या, भिन्न मुख्य आराधना।',
    coordinates: { lat: 22.5202, lng: 88.342 },
  },
]

export const diwaliPractice = {
  puja: 'Clean the house. Place Ganesha to the right of Lakshmi, both facing east or west as the family does. Offer panchamrit, sweets, coins, and a lotus or marigold. Light the first diya at the shrine, then the rest of the house. Keep one lamp through the night if you can.',
  pujaHindi:
    'घर साफ़। लक्ष्मी के दाहिने गणेश, दोनों पूर्व या पश्चिम — जैसा घर में चला आता है। पंचामृत, मिष्ठान्न, सिक्के, कमल या गेंदा। पहले मंदिर का दीया, फिर घर। एक दीप रात भर यदि सम्भव हो।',
  who: 'A household rite. No priest is required. Shopkeepers often do Chopda Pujan the same night or on Padwa.',
  whoHindi: 'गृह-विधि। पुजारी अनिवार्य नहीं। व्यापारी प्रायः उसी रात या पाडवा पर चोपड़ा पूजन करते हैं।',
  care: 'Pradosh muhurat follows local sunset, not a Delhi clock. Fireworks injure and foul the air; the lamp is the observance. Children and elders need a clear path and a watched flame.',
  careHindi:
    'प्रदोष मुहूर्त स्थानीय सूर्यास्त से है, दिल्ली की घड़ी से नहीं। पटाखे चोट और धुआँ देते हैं; दीप ही विधि है। बच्चे और बड़े — रास्ता साफ़, दीया पहरा।',
}

export const diwaliSources =
  'Drik Panchang festival lists (Delhi) for civil dates 2025–2027; Kartik Amavasya Lakshmi Puja custom; Ramayana homecoming katha; Kali Puja on the same amavasya in Bengal. Confirm pradosh and tithi with a local panchang.'

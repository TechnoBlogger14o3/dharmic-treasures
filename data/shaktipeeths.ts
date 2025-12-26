import shaktiPeethasData from './shakti_peethas_51.json'

export interface Shaktipeeth {
  id: number
  name: string
  bodyPart: string
  deviName: string
  bhairavaName: string
  location: string
  state: string
  country: string
  puranicReference: string
  description: string
}

export const shaktipeethIntroduction = {
  title: 'शक्तिपीठ का इतिहास',
  titleEnglish: 'History of Shaktipeeths',
  content: `शक्तिपीठ हिंदू धर्म के सबसे पवित्र स्थानों में से हैं। इनका निर्माण देवी सती की कथा से जुड़ा है।

जब राजा दक्ष ने यज्ञ का आयोजन किया, तो उन्होंने अपनी पुत्री सती और दामाद शिव को आमंत्रित नहीं किया। सती ने अपने पिता के यज्ञ में जाने का निर्णय लिया, लेकिन वहाँ उन्हें अपमानित किया गया। अपमान से व्यथित होकर, सती ने यज्ञ कुंड में कूदकर अपने प्राण त्याग दिए।

जब भगवान शिव को यह पता चला, तो वे क्रोधित हो गए और सती के शरीर को उठाकर तांडव करने लगे। पूरा ब्रह्मांड विनाश के कगार पर आ गया। भगवान विष्णु ने स्थिति को नियंत्रित करने के लिए अपने सुदर्शन चक्र से सती के शरीर को 51 भागों में विभाजित कर दिया।

जहाँ-जहाँ सती के शरीर के अंग गिरे, वहाँ-वहाँ शक्तिपीठ बन गए। प्रत्येक शक्तिपीठ में देवी की शक्ति और भगवान शिव (भैरव) की उपस्थिति है। इन 51 शक्तिपीठों की पूजा करने से भक्तों को मोक्ष और आध्यात्मिक शक्ति प्राप्त होती है।`,
  contentEnglish: `Shaktipeeths are among the most sacred places in Hinduism. Their origin is linked to the story of Goddess Sati.

When King Daksha organized a yajna (sacrificial ritual), he did not invite his daughter Sati and son-in-law Shiva. Sati decided to attend her father's yajna, but was humiliated there. Overwhelmed by the insult, Sati immolated herself in the yajna fire.

When Lord Shiva learned of this, he became enraged and began performing the Tandava dance while carrying Sati's body. The entire universe was on the verge of destruction. To control the situation, Lord Vishnu used his Sudarshan Chakra to divide Sati's body into 51 parts.

Wherever parts of Sati's body fell, Shaktipeeths were established. Each Shaktipeeth contains the power of the Goddess and the presence of Lord Shiva (Bhairava). Worshipping these 51 Shaktipeeths grants devotees liberation and spiritual power.`
}

export const shaktipeeths: Shaktipeeth[] = (shaktiPeethasData as unknown) as Shaktipeeth[]

// Group by state/country
export const shaktipeethsByState = shaktipeeths.reduce((acc, peeth) => {
  const key = `${peeth.state}, ${peeth.country}`
  if (!acc[key]) {
    acc[key] = []
  }
  acc[key].push(peeth)
  return acc
}, {} as Record<string, Shaktipeeth[]>)

// Count by state/country
export const shaktipeethCountByState = Object.entries(shaktipeethsByState)
  .map(([stateCountry, peeths]) => {
    const [state, country] = stateCountry.split(', ')
    return {
      state,
      country,
      stateCountry,
      count: peeths.length,
      peeths
    }
  })
  .sort((a, b) => b.count - a.count) // Sort by count descending

const BOOK_HINT =
  /gita|gitā|ramayan|mahabharat|purana|shakti|jyotir|dham|chhath|diwali|navratri|durga|dussehra|chalisa|sunder|bajrang|yaksha|satyanarayan|vishnu|shiva|shivaratri|holi|holika|janmashtami|ganesh|karva/i

const PRONOUN = /\b(them|those|these|it|that|this|they)\b/i

export function isFollowUp(question: string): boolean {
  const words = question.trim().split(/\s+/).filter(Boolean)
  if (!words.length) return false
  return PRONOUN.test(question) || (words.length <= 4 && !BOOK_HINT.test(question))
}

export function resolveChatQuery(
  question: string,
  topicQuery: string,
): { searchQuery: string; nextTopic: string } {
  const q = question.trim()
  if (!topicQuery.trim() || !isFollowUp(q)) {
    return { searchQuery: q, nextTopic: q }
  }
  return { searchQuery: `${topicQuery.trim()} ${q}`, nextTopic: topicQuery.trim() }
}

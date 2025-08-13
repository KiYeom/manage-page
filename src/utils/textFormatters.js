export const getRankingText = (rank) => {
  const suffixes = { 1: 'st', 2: 'nd', 3: 'rd' }
  return `${rank}${suffixes[rank] || 'th'}`
}

export const getEmotionLabelKorean = (emotionType, emotionTypes, emotionLabels) => {
  return emotionLabels[emotionType] || emotionType
}

//기간 리포트의 6가지 감정 그래프를 위한 상수 정의
export const EMOTION_TYPES = {
  ALL: 'all',
  ANGER: 'anger',
  SADNESS: 'sadness',
  NEVER: 'never',
  HURT: 'hurt',
  EMBARRASSMENT: 'embarrassment',
  HAPPY: 'happy',
}

export const EMOTION_LABELS = {
  [EMOTION_TYPES.ALL]: '전체',
  [EMOTION_TYPES.ANGER]: '분노',
  [EMOTION_TYPES.SADNESS]: '슬픔',
  [EMOTION_TYPES.NEVER]: '불안',
  [EMOTION_TYPES.HURT]: '상처',
  [EMOTION_TYPES.EMBARRASSMENT]: '당황',
  [EMOTION_TYPES.HAPPY]: '기쁨',
}

export const EMOTION_LIST = Object.values(EMOTION_TYPES)
export const MAX_RETRY_COUNT = 3

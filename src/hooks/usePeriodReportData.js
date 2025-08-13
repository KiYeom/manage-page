import { useState, useEffect, useCallback } from 'react'
import {
  analyticsDates,
  periodEmotionReport,
  periodKeywordReport,
  periodTotalEmotion,
} from '../apis/customers'
import { transformPeriodChartData } from '../utils/dataTransformers'

export const usePeriodReportData = (id, timeRange) => {
  const [periodEmotion, setPeriodEmotion] = useState([])
  const [periodKeyword, setPeriodKeyword] = useState([])
  const [periodTopEmotions, setPeriodTopEmotions] = useState([])
  const [keywordLoading, setKeywordLoading] = useState(false)
  const [topEmotionsLoading, setTopEmotionsLoading] = useState(false)
  const [emotionLoading, setEmotionLoading] = useState(false)

  const requestPeriodKeywords = useCallback(
    (startDate, endDate, times = 1) => {
      if (times > 3) {
        console.log('키워드 데이터 요청 횟수 초과')
        setKeywordLoading(false)
        return
      }
      setKeywordLoading(true)
      periodKeywordReport(id, startDate, endDate)
        .then((data) => {
          if (data.keywords && Array.isArray(data.keywords)) {
            setPeriodKeyword(data.keywords)
          } else {
            setPeriodKeyword([])
            requestPeriodKeywords(startDate, endDate, times + 1)
          }
        })
        .catch((error) => {
          console.log('기간 키워드 에러', error)
        })
        .finally(() => {
          setKeywordLoading(false)
        })
    },
    [id],
  )

  useEffect(() => {
    if (timeRange.length === 0) return

    // 감정 데이터 로드
    setEmotionLoading(true)
    periodEmotionReport(id, timeRange[0], timeRange[1])
      .then((data) => {
        setPeriodEmotion(transformPeriodChartData(data.charts))
      })
      .catch((error) => {
        console.log('기간 분석 에러', error)
      })
      .finally(() => {
        setEmotionLoading(false)
      })

    // 키워드 데이터 로드
    requestPeriodKeywords(timeRange[0], timeRange[1])

    // 상위 감정 데이터 로드
    setTopEmotionsLoading(true)
    periodTotalEmotion(id, timeRange[0], timeRange[1])
      .then((data) => {
        setPeriodTopEmotions(data.emotions)
      })
      .catch((error) => {
        console.log('기간 탑 감정 데이터 에러', error)
      })
      .finally(() => {
        setTopEmotionsLoading(false)
      })
  }, [id, timeRange, requestPeriodKeywords])

  return {
    periodEmotion,
    periodKeyword,
    periodTopEmotions,
    keywordLoading,
    topEmotionsLoading,
    emotionLoading,
    isLoading: keywordLoading || topEmotionsLoading || emotionLoading,
  }
}

// 초기 데이터 로드용 훅
export const useInitialData = (id) => {
  const [name, setName] = useState('')
  const [allowedDates, setAllowedDates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const year = new Date().getFullYear()

    analyticsDates(id, `${year}`)
      .then((data) => {
        setName(data.nickname)
        setAllowedDates(data.dates)
      })
      .catch((error) => {
        console.log('날짜 에러', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  return { name, allowedDates, loading }
}

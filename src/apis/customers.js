import { instance } from './interceptor'

//고객 정보 조회
export const dailyAnalyzeStatus = async () => {
  try {
    const res = await instance.get('/v1/users/manage-users')
    return res.data //record, summary, classification 리턴
  } catch (error) {
    console.log('[ERROR] daily analyze', error)
    return
  }
}

//고객 (id)의 date에 따른 일일 리포트 조회
export const dailyAnalyzeReport = async (id, date) => {
  try {
    const res = await instance.get('/v1/analyze/daily', {
      params: {
        date,
        customer: id, // customer ID와 date를 query parameter로 전달
      },
    })
    return res
  } catch (error) {
    console.log('[ERROR] daily analyze', error)
    return
  }
}

//[기간] 감정 변화 추이 데이터 분석 조회
export const periodEmotionReport = async (id, startDate, endDate) => {
  try {
    const res = await instance.get('/v1/analyze/period/chart', {
      params: {
        start_date: startDate,
        end_date: endDate,
        customer: id,
      },
    })
    return res
  } catch (error) {
    console.log('[ERROR] period analyze', error)
    return
  }
}

//[기간] 일상 키워드 데이터 분석 조회
export const periodKeywordReport = async (id, startDate, endDate) => {
  try {
    const res = await instance.get('/v1/analyze/period/keywords', {
      params: {
        start_date: startDate,
        end_date: endDate,
        customer: id,
      },
    })
    return res
  } catch (error) {
    console.log('[ERROR] period keyword analyze', error)
    return
  }
}

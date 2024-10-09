import { instance } from './interceptor'

export const dailyAnalyzeStatus = async () => {
  try {
    const res = await instance.get('/v1/users/manage-users')
    return res.data //record, summary, classification 리턴
  } catch (error) {
    console.log('[ERROR] daily analyze', error)
    return
  }
}

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

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

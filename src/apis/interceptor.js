import axios from 'axios'
import {
  clearInfoWhenLogout,
  deleteAccessToken,
  getAccessToken,
  getRefreshToken,
  getWebId,
  setAccessToken,
} from '../storages/storages'

function setInterceptor(instance) {
  instance.interceptors.request.use(async function (config) {
    const tokenValue = getAccessToken()
    config.headers.Authorization = `Bearer ${tokenValue}`
    return config
  })

  instance.interceptors.response.use(
    function (response) {
      return response.data
    },
    async function (error) {
      console.error('instance Error: ', error.response)
      if (error.response && error.response.status === 419) {
        console.log('interseptor: 419 에러 발생')
        console.log('accessToken: ', getAccessToken())
        const refreshToken = getRefreshToken()
        if (!refreshToken) {
          // refreshToken이 없으면 로그인이 안되어있는 상태
          clearInfoWhenLogout()
          //TODO: 로그인 상태를 확인하는 방법이 필요함
          console.log('[Interceptor - NoRefresh] LogOut: 1')
          return
        }

        console.log('reissueAccessToken Run')
        await reissueAccessToken(refreshToken, false)
        const accessToken = getAccessToken()
        if (!accessToken) {
          // refreshToken이 없으면 로그인이 안되어있는 상태
          clearInfoWhenLogout()
          //TODO: 로그인 상태를 확인하는 방법이 필요함
          console.log('[Interceptor - Reissue Wrong] LogOut: 2')
          return
        }

        instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        return instance(error.config)
      } else {
        console.error(error, ' 네트워크 연결 문제')
      }
      return Promise.reject(error)
    },
  )
  return instance
}

function createInstance() {
  const instance = axios.create({
    baseURL: `https://api.remind4u.co.kr/`,
  })

  return setInterceptor(instance)
}

//INFO: refreshToken으로 accessToken 재발급
export const reissueAccessToken = async (refreshToken, isAppStart = false) => {
  try {
    deleteAccessToken()
    const res = await axios.patch('https://api.remind4u.co.kr/v1/auth/refresh', {
      deviceId: getWebId(),
      appVersion: '1',
      deviceOs: 'web',
      refreshToken: refreshToken,
      isAppStart,
    })

    if (res.data.data) {
      const resDate = res.data.data
      setAccessToken(resDate.accessToken)
    }
  } catch (error) {
    console.error('[ERROR] reissueAccessToken ', error)
    return
  }
}

export const instance = createInstance()

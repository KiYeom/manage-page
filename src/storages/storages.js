//Tokens
const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const WEB_ID = 'web_id'

//clearInfoWhenLogout
export const clearInfoWhenLogout = () => {
  clearTokenInfo()
}

//setTokenInfo
export const setTokenInfo = (accessToken, refreshToken) => {
  setAccessToken(accessToken)
  setRefreshToken(refreshToken)
}

//clearTokenInfo
export const clearTokenInfo = () => {
  localStorage.delete(ACCESS_TOKEN)
  localStorage.delete(REFRESH_TOKEN)
}

//Tokens
//AccessToken
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN)
}

export const setAccessToken = (accessToken) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken)
}

export const deleteAccessToken = () => {
  localStorage.delete(ACCESS_TOKEN)
}

//RefreshToken
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN)
}

export const setRefreshToken = (refreshToken) => {
  localStorage.setItem(REFRESH_TOKEN, refreshToken)
}

export const deleteRefreshToken = () => {
  localStorage.delete(REFRESH_TOKEN)
}

//WebId
export const getWebId = () => {
  if (!localStorage.getItem(WEB_ID)) {
    localStorage.setItem(WEB_ID, crypto.randomUUID())
  }
  return localStorage.getItem(WEB_ID)
}

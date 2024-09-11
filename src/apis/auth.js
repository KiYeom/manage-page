import React from 'react'
import { getWebId } from '../storages/storages'
import { instance } from './interceptor'

//INFO: email 로그인
export const emailLogin = async (email, password) => {
  try {
    const res = await instance.post('/v1/auth/email-login', {
      email,
      providerCode: password,
      deviceId: getWebId(),
      appVersion: '1',
      deviceOs: 'web',
    })
    return res.data
  } catch (error) {
    console.error('[ERROR] email login', error)
    return
  }
}

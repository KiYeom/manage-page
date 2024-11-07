import React from 'react'
import { getWebId } from '../storages/storages'
import axios from 'axios'
import { he } from 'react-day-picker/locale'
import { instance } from './interceptor'

//INFO: email 로그인
export const refreshAnalytics = async (userId) => {
  try {
    const res = await instance.post('/v1/analyze/update-analytics', {
      params: {
        customer: userId,
      },
    })
    return res.data
  } catch (error) {
    console.error('[ERROR] refreshAnalytics', error)
    return
  }
}

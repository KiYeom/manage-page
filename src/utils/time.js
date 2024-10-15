export const START_HOUR = 6
export const KOREA_TIME_OFFSET_MINUTES = +9 * 60

export const getIsoString = (date, timezoneOffsetMinute = KOREA_TIME_OFFSET_MINUTES) => {
  const tzo = timezoneOffsetMinute,
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num) {
      return (num < 10 ? '0' : '') + num
    }

  // UTC 시간에서 오프셋을 적용한 시간을 계산합니다.
  const utc = date.getTime() + date.getTimezoneOffset() * 60000
  const localDate = new Date(utc + timezoneOffsetMinute * 60000)

  return (
    localDate.getFullYear() +
    '-' +
    pad(localDate.getMonth() + 1) +
    '-' +
    pad(localDate.getDate()) +
    'T' +
    pad(localDate.getHours()) +
    ':' +
    pad(localDate.getMinutes()) +
    ':' +
    pad(localDate.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' +
    pad(Math.abs(tzo) % 60)
  )
}

export const getDateInfo = (date, offsetInMinutes = 0) => {
  const pad = (num) => (num < 10 ? '0' : '') + num
  const realDate = new Date(date.getTime() + offsetInMinutes * 60000)

  const year = realDate.getUTCFullYear()
  const month = realDate.getUTCMonth() + 1
  const day = realDate.getUTCDate()
  const hour = realDate.getUTCHours()
  const minute = realDate.getUTCMinutes()
  const second = realDate.getUTCSeconds()

  const dateString = `${String(year)}-${pad(month)}-${pad(day)}`
  const timeString = `${pad(hour)}:${pad(minute)}:${pad(second)}`
  const dateTimeString = `${dateString}T${timeString}`

  // 년, 월, 일, 시, 분, 초 객체로 반환
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    dateString,
    timeString,
    dateTimeString,
  }
}

export const getFormattedDateTimeByOffset = (offsetInMinutes = KOREA_TIME_OFFSET_MINUTES) => {
  const now = new Date()
  const osm = offsetInMinutes
  const pad = (num) => (num < 10 ? '0' : '') + num

  // UTC 기준 시간에서 offset 만큼 시간 추가 (offset은 분 단위)
  const dateByOffset = new Date(now.getTime() + offsetInMinutes * 60000)
  const dateInfo = getDateInfo(dateByOffset)
  const isoString = `${dateInfo.dateString}T${dateInfo.timeString}${osm >= 0 ? '+' : '-'}${pad(Math.floor(Math.abs(osm) / 60))}:${pad(Math.abs(osm) % 60)}`

  // 년, 월, 일, 시, 분, 초 객체로 반환
  const dateTime = {
    ...dateInfo,
    isoString,
    dateByOffset,
  }

  return dateTime
}

export const getServiceTodayDate = (startHour = START_HOUR) => {
  const nowDate = getFormattedDateTimeByOffset()
  if (nowDate.hour >= startHour) {
    return {
      year: nowDate.year,
      month: nowDate.month,
      day: nowDate.day,
      toString: () => nowDate.dateString,
    }
  } else {
    const yesterdayDate = new Date(nowDate.dateByOffset.getTime() - 24 * 60 * 60 * 1000)
    const yesterdayDateInfo = getDateInfo(yesterdayDate)
    return {
      year: yesterdayDateInfo.year,
      month: yesterdayDateInfo.month,
      day: yesterdayDateInfo.day,
      toString: () => `${yesterdayDateInfo.dateString}`,
    }
  }
}

export const getServiceYesterdayDate = (startHour = START_HOUR) => {
  const nowDate = getFormattedDateTimeByOffset()
  const yesterdayDate = new Date(nowDate.dateByOffset.getTime() - 24 * 60 * 60 * 1000)
  if (nowDate.hour >= startHour) {
    const yesterdayDateInfo = getDateInfo(yesterdayDate)
    return {
      year: yesterdayDateInfo.year,
      month: yesterdayDateInfo.month,
      day: yesterdayDateInfo.day,
      toString: () => yesterdayDateInfo.dateString,
    }
  } else {
    const twoDaysAgoDate = new Date(yesterdayDate.getTime() - 24 * 60 * 60 * 1000)
    const twoDaysAgoDateInfo = getDateInfo(twoDaysAgoDate)
    return {
      year: twoDaysAgoDateInfo.year,
      month: twoDaysAgoDateInfo.month,
      day: twoDaysAgoDateInfo.day,
      toString: () => twoDaysAgoDateInfo.dateString,
    }
  }
}

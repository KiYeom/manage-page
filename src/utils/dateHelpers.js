//날짜 관련 함수
export const getDateBefore = (dateString, days) => {
  const date = new Date(dateString)
  date.setDate(date.getDate() - days)
  return formatDate(date)
}

//날짜를 'YYYY-MM-DD' 형식으로 포맷팅하는 함수
export const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const DEFAULT_DATE_RANGE_DAYS = 7

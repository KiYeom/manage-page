// 기간 리포트 : 차트 데이터 변환 로직 분리
export const transformPeriodChartData = (data) => {
  const periodGraph = {}

  data.forEach((categoryData) => {
    const { category, chart } = categoryData

    chart.forEach((entry) => {
      const { date, value } = entry

      if (!periodGraph[date]) {
        periodGraph[date] = { date }
      }

      periodGraph[date][category] = value
    })
  })

  return Object.values(periodGraph).map((entry) => ({
    date: entry.date,
    anger: entry.anger || 0,
    sadness: entry.sadness || 0,
    nerve: entry.nerve || 0,
    hurt: entry.hurt || 0,
    embarrassment: entry.embarrassment || 0,
    happy: entry.happy || 0,
  }))
}

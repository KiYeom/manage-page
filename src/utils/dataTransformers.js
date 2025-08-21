// 기간 리포트 : 차트 데이터 변환 로직 분리
export const transformPeriodChartData = (data) => {
  const periodGraph = {};

  data.forEach((categoryData) => {
    const { category, chart } = categoryData;

    chart.forEach((entry) => {
      const { date, value } = entry;

      if (!periodGraph[date]) {
        periodGraph[date] = { date };
      }

      periodGraph[date][category] = value;
    });
  });

  return Object.values(periodGraph).map((entry) => ({
    date: entry.date,
    anger: entry.anger || 0,
    sadness: entry.sadness || 0,
    nerve: entry.nerve || 0,
    hurt: entry.hurt || 0,
    embarrassment: entry.embarrassment || 0,
    happy: entry.happy || 0,
  }));
};

/* 일일 리포트 */
// src/utils/dataTransformers.js

//요약 키워드 데이터 처리
export const handleSummaryKeyword = (data) => {
  if (!data || data.isNULL) {
    return [];
  }
  return data.keywords || [];
};

// 직접 기록한 감정 데이터 처리
export const handleRecordedEmotion = (data) => {
  if (!data || data.isNULL || !data.Keywords) {
    return [];
  }
  return data.Keywords.map((item) => item.keyword);
};
//오늘의 일기 데이터
export const handleFeeling = (data) => {
  if (!data || data.isNULL || !data.todayFeeling) {
    return '';
  }
  return data.todayFeeling;
};
//위험 점수 데이터
export const handleDangerScore = (data) => {
  if (!data || typeof data.score !== 'number') {
    return 0;
  }
  return data.score;
};
//위험 점수 업데이트
export const handleDangerScoreUpdate = (data) => {
  if (!data || !data.updateTime) {
    return '';
  }
  return data.updateTime;
};
//감정 분석 데이터 (도넛 차트)
export const handleEmotionsData = (data) => {
  console.log('도넛', data, !data, data.isNULL);
  if (!data || data.isNULL) {
    return { labels: [], percent: [] };
  }
  const labels = data.labels.map((item) => item.label);
  const percent = data.labels.map((item) => item.percent);
  console.log('label, percent', labels, percent);
  return { labels, percent };
};

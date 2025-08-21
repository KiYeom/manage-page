import { useState, useEffect, useCallback } from 'react';
import { dailyAnalyzeReport, requestReport } from '../apis/customers';
import {
  handleSummaryKeyword,
  handleRecordedEmotion,
  handleFeeling,
  handleDangerScore,
  handleDangerScoreUpdate,
  handleEmotionsData,
} from '../utils/dataTransformers';

export const useDailyReportData = (id, nowDate) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDailyReport = useCallback(async () => {
    if (!nowDate) return;
    setLoading(true);
    setError(null);
    try {
      const data = await dailyAnalyzeReport(id, nowDate);
      console.log('일일 데이터', data);
      setReportData(data);
    } catch (err) {
      console.error('일일 리포트 데이터 가져오기 에러:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id, nowDate]);

  // 실시간 업데이트 로직도 훅으로 분리
  const requestRefresh = useCallback(async () => {
    try {
      const result = await requestReport(Number(id));
      return result;
    } catch (err) {
      console.error('리포트 업데이트 에러:', err);
      return { result: false, reason: 0 };
    }
  }, [id]);

  useEffect(() => {
    fetchDailyReport();
  }, [fetchDailyReport]);

  const parsedData = reportData
    ? {
        dailyKeyword: handleSummaryKeyword(reportData.summary),
        dailyRecordedEmotion: handleRecordedEmotion(reportData.record),
        feeling: handleFeeling(reportData.record),
        dangerScore: handleDangerScore(reportData.score),
        dangerUpdate: handleDangerScoreUpdate(reportData.score),
        pieData: handleEmotionsData(reportData.classification),
        isDataNull: reportData.classification.isNULL,
      }
    : {};

  return { ...parsedData, loading, error, fetchDailyReport, requestRefresh };
};

// src/views/report/PeriodReport.js

import React, { useState, useCallback, useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { CButton, CCol, CRow, CListGroupItem, CSpinner } from '@coreui/react';
import ReportHeader from '../components/reportheader/ReportHeader';
import DateRangePicker from '../components/dateRangePicker/DateRangePicker';
import ListCard from '../components/listcard/ListCard';
import EmotionChart from '../views/report/components/EmotionChart';
import palette from '../assets/styles/theme';
import { getDateInfo, KOREA_TIME_OFFSET_MINUTES } from '../utils/time';
import {
  usePeriodReportData,
  useInitialData,
  useDefaultTimeRange,
} from '../hooks/usePeriodReportData';

const PeriodReport = () => {
  const { id } = useParams();
  const { name, allowedDates, loading: initialLoading } = useInitialData(id);
  const defaultTimeRange = useDefaultTimeRange();

  const [timeRange, setTimeRange] = useState(defaultTimeRange);
  const [clickedBtn, setClickedBtn] = useState(0);

  const { periodEmotion, periodKeyword, periodTopEmotions, keywordLoading, topEmotionsLoading } =
    usePeriodReportData(id, timeRange);

  const isLoading = initialLoading || keywordLoading || topEmotionsLoading;

  // useCallback으로 함수를 메모이제이션하여 불필요한 재생성 방지
  const handleTimeRangeConfirm = useCallback((newTimeRange) => {
    setTimeRange(newTimeRange);
  }, []);

  const isDateDisabled = useCallback(
    (date) => {
      return !allowedDates.includes(getDateInfo(date, KOREA_TIME_OFFSET_MINUTES).dateString);
    },
    [allowedDates]
  );

  // ListCard에 전달할 렌더링 함수를 정의
  const renderKeywordItem = useCallback(
    (keyword, index) => (
      <CListGroupItem
        key={index}
        className="d-flex justify-content-between align-items-center"
        style={{
          borderLeft: `4px solid ${palette.primary || '#5856D6'}`,
          backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
        }}
      >
        <span>{keyword}</span>
      </CListGroupItem>
    ),
    []
  );

  const renderEmotionItem = useCallback(
    (emotion, index) => (
      <CListGroupItem
        key={index}
        className="d-flex justify-content-between align-items-center"
        style={{
          backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
        }}
      >
        <span>{emotion}</span>
      </CListGroupItem>
    ),
    []
  );

  // useMemo를 사용해 데이터 변환 결과 캐싱
  const top10Emotions = useMemo(() => periodTopEmotions?.slice(0, 10), [periodTopEmotions]);

  if (!defaultTimeRange || !timeRange) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <CSpinner />
      </div>
    );
  }

  return (
    <>
      <ReportHeader customerId={id} customerName={name} timeRange={timeRange}>
        <DateRangePicker
          defaultTimeRange={defaultTimeRange}
          onConfirm={handleTimeRangeConfirm}
          isDateDisabled={isDateDisabled}
          isLoading={isLoading}
        />
        <CButton color="primary" component={NavLink} to={`/customers/daily-report/${id}`}>
          일일 리포트 확인
        </CButton>
      </ReportHeader>

      {/* 6가지 감정 차트 */}
      <EmotionChart
        periodEmotion={periodEmotion}
        timeRange={timeRange}
        selectedEmotion={clickedBtn}
        onEmotionSelect={setClickedBtn}
      />

      {/* 기간 키워드 & 감정 순위 리스트 */}
      <CRow className="mb-4 align-items-start">
        <CCol lg={6}>
          <ListCard
            title="기간 키워드"
            subtitle={`${timeRange[0]}~${timeRange[1]}`}
            isLoading={keywordLoading}
            data={periodKeyword}
            emptyMessage="그동안의 키워드 정보가 없습니다."
            renderItem={renderKeywordItem} // props로 함수 전달
          />
        </CCol>
        <CCol lg={6}>
          <ListCard
            title="기간 감정 순위"
            subtitle={`${timeRange[0]}~${timeRange[1]}`}
            isLoading={topEmotionsLoading}
            data={top10Emotions}
            emptyMessage="그동안의 감정 정보가 없습니다."
            renderItem={renderEmotionItem} // props로 함수 전달
          />
        </CCol>
      </CRow>
    </>
  );
};

export default PeriodReport;

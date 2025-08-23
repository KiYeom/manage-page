// src/views/report/DailyReport.js (높이 동일화 수정)

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import {
  CButton,
  CCol,
  CRow,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CProgress,
  CSpinner,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSync } from '@coreui/icons';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import ListCard from '../components/listcard/ListCard';
import ReportHeader from '../components/reportheader/ReportHeader';
import DateRangePicker from '../components/dateRangePicker/DateRangePicker';
import Title from '../views/base/title/Title';
import { getDateInfo, getServiceTodayDate, KOREA_TIME_OFFSET_MINUTES } from '../utils/time';
import { useInitialData } from '../hooks/usePeriodReportData';
import { useDailyReportData } from '../hooks/useDailyReportData';
import DailyDoughnutChart from '../components/dailyReport/DailyDoughnutChart';
import { ResponsiveContainer } from 'recharts';
import palette from '../assets/styles/theme';
import { navigateToReport } from '../utils/tableUtils';
const DailyReport = () => {
  const { id } = useParams();
  const today = getServiceTodayDate().toString();
  const { name, allowedDates, loading: initialLoading } = useInitialData(id);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const nowDate = useMemo(
    () => getDateInfo(selectedDate, KOREA_TIME_OFFSET_MINUTES).dateString,
    [selectedDate]
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [barValue, setBarValue] = useState(0);

  const {
    dailyKeyword,
    dailyRecordedEmotion,
    feeling,
    dangerScore,
    dangerUpdate,
    pieData,
    loading: dailyReportLoading,
    isDataNull,
    requestRefresh,
  } = useDailyReportData(id, nowDate);

  const handleDateChange = useCallback((newTimeRange) => {
    if (newTimeRange && newTimeRange.length > 0) {
      setSelectedDate(new Date(newTimeRange[0]));
    }
  }, []);

  const handleRequestRefresh = useCallback(async () => {
    setModalVisible(true);
    setRefreshing(true);
    let currentBarValue = 0;
    const interval = setInterval(() => {
      currentBarValue += 10;
      setBarValue(currentBarValue > 100 ? 100 : currentBarValue);
    }, 500);

    const result = await requestRefresh();

    clearInterval(interval);
    setBarValue(100);

    setTimeout(() => {
      setRefreshing(false);
      setModalVisible(false);
      if (result.result) {
        window.location.reload();
      } else {
        alert('업데이트 실패: ' + (result.reason || '알 수 없는 오류'));
      }
    }, 500);
  }, [requestRefresh]);

  const isDateDisabled = useCallback(
    (date) => !allowedDates.includes(getDateInfo(date, KOREA_TIME_OFFSET_MINUTES).dateString),
    [allowedDates]
  );

  const renderItem = useCallback(
    (item, index, array) => (
      <div key={index}>
        <CListGroupItem className="d-flex justify-content-start align-items-center py-3 border-0">
          <span className="text-start">{item}</span>
        </CListGroupItem>
        {index < array.length - 1 && (
          <div
            style={{
              height: '1px',
              backgroundColor: '#dee2e6',
              marginLeft: '10px',
              marginRight: '20px',
            }}
          />
        )}
      </div>
    ),
    []
  );

  if (initialLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <CSpinner />
      </div>
    );
  }

  const isToday = nowDate === today;

  return (
    <>
      <CModal visible={modalVisible} alignment="center" onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>실시간 업데이트하기</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>해당 사용자 오늘의 감정 분석을 실시간으로 업데이트하시겠습니까?</p>
          {refreshing && <CProgress color="info" variant="striped" animated value={barValue} />}
        </CModalBody>
        <CModalFooter>
          {!refreshing && (
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              취소
            </CButton>
          )}
          <CButton color="primary" onClick={handleRequestRefresh} disabled={refreshing}>
            {refreshing ? '업데이트 중...' : '업데이트하기'}
          </CButton>
        </CModalFooter>
      </CModal>

      <ReportHeader customerId={id} customerName={name} timeRange={[nowDate, nowDate]}>
        <DateRangePicker
          defaultTimeRange={[nowDate, nowDate]}
          onConfirm={handleDateChange}
          isDateDisabled={isDateDisabled}
          mode="single"
        />
        <CButton color="primary" onClick={() => navigateToReport('period', id)}>
          기간 리포트 확인
        </CButton>
      </ReportHeader>

      {/* 첫 번째 행: 대화 주제 & 감정 분석 결과 */}
      <CRow className="mb-4">
        <CCol lg={6} className="d-flex">
          <ListCard
            title="대화 주제"
            subtitle="내담자가 많이 언급한 주제입니다"
            isLoading={dailyReportLoading}
            data={dailyKeyword}
            emptyMessage="나눈 대화가 없습니다."
            renderItem={renderItem}
            className="flex-fill"
            style={{ minHeight: '400px' }}
          />
        </CCol>
        <CCol lg={6} className="d-flex">
          <CCard className="flex-fill" style={{ minHeight: '400px' }}>
            <CCardHeader>
              <Title title="감정 분석 결과" subtitle="대화를 통해 분석한 내담자의 감정입니다." />
            </CCardHeader>
            {dailyReportLoading ? (
              <CCardBody className="d-flex justify-content-center align-items-center flex-fill">
                <CSpinner />
              </CCardBody>
            ) : pieData && pieData.labels.length > 0 ? (
              <>
                <CCardBody className="d-flex justify-content-center align-items-center flex-fill">
                  <div style={{ width: '280px', height: '280px' }}>
                    <DailyDoughnutChart pieData={pieData} />
                  </div>
                </CCardBody>
                <CCardFooter className="d-flex flex-wrap justify-content-center border-top-0 bg-transparent pt-0">
                  {pieData.labels.map((label, index) => {
                    const colors = [
                      palette.graph[100],
                      palette.graph[200],
                      palette.graph[300],
                      palette.graph[400],
                      palette.graph[500],
                      palette.graph[600],
                    ];
                    return (
                      <div key={index} className="d-flex align-items-center me-4 mb-2">
                        <div
                          style={{
                            width: '14px',
                            height: '14px',
                            backgroundColor: colors[index % colors.length],
                            marginRight: '8px',
                            borderRadius: '3px',
                          }}
                        ></div>
                        <span>{label}</span>
                      </div>
                    );
                  })}
                </CCardFooter>
              </>
            ) : (
              <CCardBody className="d-flex flex-column justify-content-center align-items-center flex-fill">
                <div style={{ textAlign: 'center' }}>
                  <p className="mb-3">대화 양이 부족하여 감정 분석이 제공되지 않습니다.</p>
                  {isToday && (
                    <CButton color="primary" onClick={() => setModalVisible(true)}>
                      <CIcon icon={cilSync} className="me-2" />
                      실시간 업데이트하기
                    </CButton>
                  )}
                </div>
              </CCardBody>
            )}
          </CCard>
        </CCol>
      </CRow>

      {/* 두 번째 행: 오늘의 일기 & 내담자가 기록한 감정 */}
      <CRow className="mb-4">
        <CCol lg={6} className="d-flex">
          <ListCard
            title="오늘의 일기"
            subtitle="내담자가 작성한 일기입니다."
            isLoading={dailyReportLoading}
            emptyMessage="이 날의 한 줄 기록이 없습니다."
            className="flex-fill"
            style={{ minHeight: '300px' }}
          />
        </CCol>
        <CCol lg={6} className="d-flex">
          <ListCard
            title="내담자가 기록한 감정"
            subtitle="내담자가 직접 선택한 감정 단어입니다."
            isLoading={dailyReportLoading}
            data={dailyRecordedEmotion}
            emptyMessage="기록한 감정이 없습니다."
            renderItem={renderItem}
            className="flex-fill"
            style={{ minHeight: '300px' }}
          />
        </CCol>
      </CRow>
    </>
  );
};

export default DailyReport;

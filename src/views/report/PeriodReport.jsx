import React, { useState, useEffect, useCallback } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import {
  CButton,
  CCol,
  CRow,
  CListGroupItem,
  CSpinner,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CCollapse,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';
import palette from '../../assets/styles/theme';
import { DayPicker } from 'react-day-picker';
import Title from '../base/title/Title';
import { getDateInfo, KOREA_TIME_OFFSET_MINUTES } from '../../utils/time';
import ListCard from '../../components/listcard/ListCard';
import EmotionChart from './components/EmotionChart';
import {
  usePeriodReportData,
  useInitialData,
  useDefaultTimeRange,
} from '../../hooks/usePeriodReportData';

const PeriodReport = () => {
  const [clickedBtn, setClickedBtn] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // 모바일 메뉴 상태 추가
  const { id } = useParams();
  const { name, allowedDates, loading: initialLoading } = useInitialData(id);

  const [selected, setSelected] = useState();
  const defaultTimeRange = useDefaultTimeRange();
  const [timeRange, setTimeRange] = useState(defaultTimeRange);

  const { periodEmotion, periodKeyword, periodTopEmotions, keywordLoading, topEmotionsLoading } =
    usePeriodReportData(id, timeRange);

  const handleDateSelection = useCallback(() => {
    if (selected && selected.from && selected.to) {
      setTimeRange([
        getDateInfo(selected.from, KOREA_TIME_OFFSET_MINUTES).dateString,
        getDateInfo(selected.to, KOREA_TIME_OFFSET_MINUTES).dateString,
      ]);
    }
    setDropdownOpen(false);
  }, [selected]);

  const isDateDisabled = useCallback(
    (date) => {
      return !allowedDates.includes(getDateInfo(date, KOREA_TIME_OFFSET_MINUTES).dateString);
    },
    [allowedDates]
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 0px',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <Title
          title={`${name} (#${id})`}
          subtitle={`${timeRange[0]}~${timeRange[1]}의 리포트입니다.`}
        />

        {/* 데스크탑 버튼 그룹 */}
        <div className="d-none d-md-flex align-items-center" style={{ gap: '0.75rem' }}>
          <CDropdown variant="btn-group" autoClose={false} visible={dropdownOpen}>
            <CDropdownToggle
              color="primary"
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
              disabled={keywordLoading || topEmotionsLoading}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              날짜 선택
            </CDropdownToggle>
            <CDropdownMenu style={{ padding: '10px' }}>
              <DayPicker
                captionLayout="dropdown"
                mode="range"
                timeZone="Asia/Seoul"
                selected={selected}
                onSelect={setSelected}
                disabled={isDateDisabled}
              />
              <div className="d-grid gap-2">
                <CButton color="primary" onClick={handleDateSelection}>
                  날짜 선택 완료
                </CButton>
              </div>
            </CDropdownMenu>
          </CDropdown>

          <CButton
            color="primary"
            to={`/customers/daily-report/${id}`}
            as={NavLink}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            일일 리포트 확인
          </CButton>
        </div>

        {/* 모바일 메뉴 토글 버튼 */}
        <CButton
          className="d-md-none"
          color="primary"
          variant="outline"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.375rem 0.75rem',
          }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CButton>
      </div>

      {/* 모바일 접이식 메뉴 */}
      <CCollapse visible={mobileMenuOpen} className="d-md-none mb-3">
        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '0.375rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <CDropdown variant="btn-group" autoClose={false} visible={dropdownOpen}>
            <CDropdownToggle
              color="primary"
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
              disabled={keywordLoading || topEmotionsLoading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              날짜 선택
            </CDropdownToggle>
            <CDropdownMenu style={{ padding: '10px', width: '100%' }}>
              <DayPicker
                captionLayout="dropdown"
                mode="range"
                timeZone="Asia/Seoul"
                selected={selected}
                onSelect={setSelected}
                disabled={isDateDisabled}
              />
              <div className="d-grid gap-2">
                <CButton color="primary" onClick={handleDateSelection}>
                  날짜 선택 완료
                </CButton>
              </div>
            </CDropdownMenu>
          </CDropdown>

          <CButton
            color="primary"
            to={`/customers/daily-report/${id}`}
            as={NavLink}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            일일 리포트 확인
          </CButton>
        </div>
      </CCollapse>

      {/* 6가지 감정 차트*/}
      <EmotionChart
        periodEmotion={periodEmotion}
        timeRange={timeRange}
        selectedEmotion={clickedBtn}
        onEmotionSelect={setClickedBtn}
      />

      <CRow className="mb-4 align-items-start">
        <CCol lg={6}>
          <ListCard
            title="기간 키워드"
            subtitle={`${timeRange[0]}~${timeRange[1]}`}
            listProps={{ layout: 'vertical' }} // vertical로 변경
          >
            {keywordLoading ? (
              <CListGroupItem className="d-flex justify-content-center">
                <CSpinner color="primary" />
              </CListGroupItem>
            ) : !periodKeyword || periodKeyword.length === 0 ? (
              <CListGroupItem className="d-flex justify-content-center">
                그동안의 키워드 정보가 없습니다.
              </CListGroupItem>
            ) : (
              periodKeyword.map((keyword, index) => (
                <CListGroupItem
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    borderLeft: `4px solid ${palette.primary || '#5856D6'}`,
                    backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                    marginBottom: '4px',
                    padding: '14px 20px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#2c3e50',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {keyword}
                  </span>
                </CListGroupItem>
              ))
            )}
          </ListCard>
        </CCol>
        <CCol lg={6}>
          <ListCard
            title="기간 감정 순위"
            subtitle={`${timeRange[0]}~${timeRange[1]}`}
            listProps={{ layout: 'vertical' }} // vertical로 변경
          >
            {topEmotionsLoading ? (
              <CListGroupItem className="d-flex justify-content-center">
                <CSpinner color="primary" />
              </CListGroupItem>
            ) : !periodTopEmotions || periodTopEmotions.length === 0 ? (
              <CListGroupItem className="d-flex justify-content-center">
                그동안의 감정 정보가 없습니다.
              </CListGroupItem>
            ) : (
              periodTopEmotions.slice(0, 10).map((emotion, index) => {
                return (
                  <CListGroupItem
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                    style={{
                      backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                      marginBottom: '4px',
                      padding: '14px 20px',
                      transition: 'all 0.2s ease',
                      cursor: 'default',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#2c3e50',
                        letterSpacing: '0.3px',
                      }}
                    >
                      {emotion}
                    </span>
                  </CListGroupItem>
                );
              })
            )}
          </ListCard>
        </CCol>
      </CRow>
    </>
  );
};

export default PeriodReport;

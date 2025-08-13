import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
import palette from '../../assets/styles/theme'
import {
  analyticsDates,
  periodEmotionReport,
  periodKeywordReport,
  periodTotalEmotion,
} from '../../apis/customers'
import { DayPicker } from 'react-day-picker'
import Title from '../base/title/Title'
import {
  getDateInfo,
  getServiceTodayDate,
  getServiceYesterdayDate as getServiceYesterdayDate,
  KOREA_TIME_OFFSET_MINUTES,
} from '../../utils/time'
import ListCard from '../../components/listcard/ListCard'
import { getDateBefore } from '../../utils/dateHelpers'
import { transformPeriodChartData } from '../../utils/dataTransformers'
import EmotionChart from './components/EmotionChart'

const PeriodReport = () => {
  const [clickedBtn, setClickedBtn] = useState(0)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // 모바일 메뉴 상태 추가
  const { id } = useParams()
  const [name, setName] = useState('')
  const [allowedDates, setAllowedDates] = useState([])
  const [selected, setSelected] = useState()
  const [timeRange, setTimeRange] = useState([])
  const [periodEmotion, setPeriodEmotion] = useState([]) // 기간 감정분석
  const [periodKeyword, setPeriodKeyword] = useState([]) // 기간 키워드 분석
  const [keywordLoading, setKeywordLoading] = useState(false) //로딩 상태
  const [periodTopEmotions, setPeriodTopEmotions] = useState([]) // 기간 상위 감정 분석
  const [topEmotionsLoading, setTopEmotionsLoading] = useState(false) // 상위 감정 로딩 상태

  const requestPeriodKeywords = (startDate, endDate, times = 1) => {
    if (times > 3) {
      console.log('키워드 데이터 요청 횟수 초과')
      setKeywordLoading(false)
      return
    }
    setKeywordLoading(true)
    periodKeywordReport(id, startDate, endDate)
      .then((data) => {
        if (data.keywords && Array.isArray(data.keywords)) {
          console.log('기간 키워드 데이터', data)
          setPeriodKeyword(data.keywords)
        } else {
          console.log('기간 키워드 형식 오류', data)
          setPeriodKeyword([])
          setKeywordLoading(false)
          requestPeriodKeywords(startDate, endDate, times + 1)
        }
      })
      .catch((error) => {
        console.log('기간 키워드 에러', error)
      })
      .finally(() => {
        setKeywordLoading(false)
      })
  }

  useEffect(() => {
    const year = new Date().getFullYear()
    setTimeRange([
      getDateBefore(getServiceYesterdayDate().toString(), 7),
      getServiceTodayDate().toString(),
    ])

    analyticsDates(id, `${year}`)
      .then((data) => {
        setName(data.nickname)
        setAllowedDates(data.dates)
      })
      .catch((error) => {
        console.log('날짜 에러', error)
      })
  }, [])

  const handleDateSelection = () => {
    if (selected && selected.from && selected.to) {
      setTimeRange([
        getDateInfo(selected.from, KOREA_TIME_OFFSET_MINUTES).dateString,
        getDateInfo(selected.to, KOREA_TIME_OFFSET_MINUTES).dateString,
      ])
    }
    setDropdownOpen(false)
  }

  useEffect(() => {
    if (timeRange.length === 0) return
    console.log('startDate: ', timeRange[0])
    console.log('endDate: ', timeRange[1])

    periodEmotionReport(id, timeRange[0], timeRange[1])
      .then((data) => {
        console.log('기간 분석 데이터', data)
        setPeriodEmotion(transformPeriodChartData(data.charts))
      })
      .catch((error) => {
        console.log('기간 분석 에러', error)
      })

    requestPeriodKeywords(timeRange[0], timeRange[1])

    setTopEmotionsLoading(true)
    periodTotalEmotion(id, timeRange[0], timeRange[1])
      .then((data) => {
        console.log('기간 탑 감정 데이터', data)
        setPeriodTopEmotions(data.emotions)
      })
      .catch((error) => {
        console.log('기간 탑 감정 데이터 에러', error)
      })
      .finally(() => {
        setTopEmotionsLoading(false)
      })
  }, [timeRange])

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
                setDropdownOpen(!dropdownOpen)
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
                disabled={(date) => {
                  return !allowedDates.includes(
                    getDateInfo(date, KOREA_TIME_OFFSET_MINUTES).dateString,
                  )
                }}
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
                setDropdownOpen(!dropdownOpen)
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
                disabled={(date) => {
                  return !allowedDates.includes(
                    getDateInfo(date, KOREA_TIME_OFFSET_MINUTES).dateString,
                  )
                }}
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e8f4f8'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f8f9fa' : 'white'
                    e.currentTarget.style.transform = 'translateX(0)'
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8f4f8'
                      e.currentTarget.style.transform = 'translateX(4px)'
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f8f9fa' : 'white'
                      e.currentTarget.style.transform = 'translateX(0)'
                      e.currentTarget.style.boxShadow = 'none'
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
                )
              })
            )}
          </ListCard>
        </CCol>
      </CRow>
    </>
  )
}

export default PeriodReport

import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CRow,
  CListGroup,
  CListGroupItem,
  CSpinner,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CBadge,
} from '@coreui/react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import axios from 'axios'
import palette from '../../assets/styles/theme'
import userTableDummy from '../../assets/dummy' // 더미 데이터를 import
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
import { EMOTION_TYPES, EMOTION_LABELS } from '../../utils/emotion'
import { getDateBefore } from '../../utils/dateHelpers'
import { transformPeriodChartData } from '../../utils/dataTransformers'
import EmotionChart from './components/EmotionChart'

const emotionList = ['all', 'anger', 'sadness', 'nerve', 'hurt', 'embarrassment', 'happy']
const emotionListKorean = ['전체', '분노', '슬픔', '불안', '상처', '당황', '기쁨']

const getValueKorean = (value) => {
  return emotionListKorean[emotionList.indexOf(value)]
}

const getRankingText = (rank) => {
  if (rank === 1) return '1st'
  if (rank === 2) return '2nd'
  if (rank === 3) return '3rd'
  return `${rank}th`
}

const PeriodReport = () => {
  const [clickedBtn, setClickedBtn] = useState(0)
  const [dateClicked, setDateClicked] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
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
    setTimeRange([
      getDateBefore(getServiceYesterdayDate().toString(), 7),
      getServiceTodayDate().toString(),
    ])

    analyticsDates(id, '2024')
      .then((data) => {
        setName(data.nickname)
        setAllowedDates(data.dates)
      })
      .catch((error) => {
        console.log('날짜 에러', error)
      })
  }, [])

  useEffect(() => {
    if (selected === undefined || !selected.from || !selected.to) return
    setTimeRange([
      getDateInfo(selected.from, KOREA_TIME_OFFSET_MINUTES).dateString,
      getDateInfo(selected.to, KOREA_TIME_OFFSET_MINUTES).dateString,
    ])
  }, [dateClicked])

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

  const renderAreas = () => {
    if (clickedBtn === 0) {
      // 'all'을 클릭했을 때 모든 감정 데이터를 보여줌
      return emotionList
        .slice(1)
        .map((emotion, index) => (
          <Area
            key={emotion}
            type="monotone"
            dataKey={emotion}
            stroke={palette.graph[(index + 1) * 100]}
            fillOpacity={0.3}
            fill={palette.graph[(index + 1) * 100]}
          />
        ))
    } else {
      // 특정 감정을 선택했을 때 해당 감정만 보여줌
      return (
        <Area
          type="monotone"
          dataKey={emotionList[clickedBtn]}
          stroke={palette.graph[clickedBtn * 100]}
          fill={palette.graph[clickedBtn * 100]}
          fillOpacity={0.3}
        />
      )
    }
  }

  // if (loading) {
  //   return (
  //     <div
  //       style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
  //     >
  //       <CSpinner color="primary" style={{ width: '4rem', height: '4rem' }} />
  //     </div>
  //   )
  // }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '10px 0px',
          flexWrap: 'wrap',
        }}
      >
        <Title
          title={`${name} (#${id})`}
          subtitle={`${timeRange[0]}~${timeRange[1]}의 리포트입니다.`}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
            width: window.innerWidth <= 768 ? '100%' : 'auto',
            marginTop: window.innerWidth <= 768 ? '10px' : '0',
          }}
        >
          <CDropdown variant="btn-group" autoClose={false} visible={dropdownOpen}>
            <CDropdownToggle
              color="primary"
              onClick={() => {
                setDropdownOpen(!dropdownOpen)
              }}
              disabled={keywordLoading || topEmotionsLoading}
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
                <CButton
                  color="primary"
                  onClick={() => {
                    setDateClicked(!dateClicked)
                    setDropdownOpen(false)
                  }}
                >
                  날짜 선택 완료
                </CButton>
              </div>
            </CDropdownMenu>
          </CDropdown>
          <CButton
            color="primary"
            to={`/customers/daily-report/${id}`}
            as={NavLink}
            onClick={() => {
              console.log('버튼 클릭')
            }}
          >
            일일 리포트 확인
          </CButton>
        </div>
      </div>

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
            listProps={{ layout: 'horizontal' }} // 가로형 필요 시
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
              // 2개씩 한 줄에 보여주기
              periodKeyword.reduce((acc, item, index, arr) => {
                if (index % 2 === 0) {
                  const keyword1 = item
                  const keyword2 = arr[index + 1] ?? '-'
                  acc.push(
                    <React.Fragment key={index}>
                      <CListGroupItem className="d-flex justify-content-between flex-fill">
                        {keyword1}
                        <CBadge color="primary">{getRankingText(index + 1)}</CBadge>
                      </CListGroupItem>
                      <CListGroupItem className="d-flex justify-content-between flex-fill">
                        {keyword2}
                        <CBadge color="primary">{getRankingText(index + 2)}</CBadge>
                      </CListGroupItem>
                    </React.Fragment>,
                  )
                }
                return acc
              }, [])
            )}
          </ListCard>
        </CCol>
        <CCol lg={6}>
          <ListCard
            title="기간 감정 순위"
            subtitle={`${timeRange[0]}~${timeRange[1]}`}
            listProps={{ layout: 'horizontal' }}
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
              periodTopEmotions.slice(0, 10).reduce((acc, item, index, arr) => {
                if (index % 2 === 0) {
                  const emo1 = item
                  const emo2 = arr[index + 1] ?? '-'
                  acc.push(
                    <React.Fragment key={index}>
                      <CListGroupItem className="d-flex justify-content-between flex-fill">
                        {emo1}
                        <CBadge color="primary">{getRankingText(index + 1)}</CBadge>
                      </CListGroupItem>
                      <CListGroupItem className="d-flex justify-content-between flex-fill">
                        {emo2}
                        <CBadge color="primary">{getRankingText(index + 2)}</CBadge>
                      </CListGroupItem>
                    </React.Fragment>,
                  )
                }
                return acc
              }, [])
            )}
          </ListCard>
        </CCol>
      </CRow>
    </>
  )
}

export default PeriodReport

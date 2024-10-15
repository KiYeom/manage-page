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
import { analyticsDates, periodEmotionReport, periodKeywordReport } from '../../apis/customers'
import { DayPicker } from 'react-day-picker'
import Title from '../base/title/Title'
import {
  getDateInfo,
  getServiceYesterdayDate as getServiceYesterdayDate,
  KOREA_TIME_OFFSET_MINUTES,
} from '../../utils/time'

const getDateBefore = (dateString, days) => {
  const date = new Date(dateString)
  date.setDate(date.getDate() - days)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const handlePeriodChart = (data) => {
  // Create an object to store the date-wise emotions
  let periodGraph = {}

  // Iterate over each emotion category
  data.forEach((categoryData) => {
    const category = categoryData.category
    const chart = categoryData.chart

    // Iterate over the chart data
    chart.forEach((entry) => {
      const date = entry.date
      const value = entry.value

      // If the date is not in the periodGraph, initialize it
      if (!periodGraph[date]) {
        periodGraph[date] = { date }
      }

      // Add the category value to the date object
      periodGraph[date][category] = value
    })
  })

  // Convert periodGraph object to an array and fill missing categories with 0
  let result = Object.values(periodGraph).map((entry) => ({
    date: entry.date,
    anger: entry.anger || 0,
    sadness: entry.sadness || 0,
    nerve: entry.nerve || 0,
    hurt: entry.hurt || 0,
    embarrassment: entry.embarrassment || 0,
    happy: entry.happy || 0,
  }))

  return result
}

const emotionList = ['all', 'anger', 'sadness', 'nerve', 'hurt', 'embarrassment', 'happy']
const emotionListKorean = ['전체', '분노', '슬픔', '불안', '상처', '당황', '기쁨']

const PeriodReport = () => {
  const [clickedBtn, setClickedBtn] = useState(0)
  const [dateCLicked, setDateClicked] = useState(false)
  const { id } = useParams()
  const [name, setName] = useState('')
  const [selected, setSelected] = useState()
  const [timeRange, setTimeRange] = useState([])
  const [periodEmotion, setPeriodEmotion] = useState([]) // 기간 감정분석
  const [periodKeyword, setPeriodKeyword] = useState([]) // 기간 키워드 분석
  const [loading, setLoading] = useState(true) //로딩 상태

  useEffect(() => {
    setTimeRange([
      getDateBefore(getServiceYesterdayDate().toString(), 7),
      getServiceYesterdayDate().toString(),
    ])

    analyticsDates(id, '2024')
      .then((data) => {
        setName(data.nickname)
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
  }, [dateCLicked])

  useEffect(() => {
    if (timeRange.length === 0) return
    setLoading(true)
    console.log('startDate: ', timeRange[0])
    console.log('endDate: ', timeRange[1])

    periodEmotionReport(id, timeRange[0], timeRange[1])
      .then((data) => {
        console.log('기간 분석 데이터', data)
        setPeriodEmotion(handlePeriodChart(data.charts))
      })
      .catch((error) => {
        console.log('기간 분석 에러', error)
      })

    periodKeywordReport(id, timeRange[0], timeRange[1])
      .then((data) => {
        console.log('기간 키워드 데이터', data)
        setPeriodKeyword(data.keywords)
      })
      .catch((error) => {
        console.log('기간 키워드 에러', error)
      })

    setLoading(false)
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
        }}
      >
        <Title
          title={`${name} (#${id})`}
          subtitle={`${timeRange[0]}~${timeRange[1]}의 리포트입니다.`}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
          <CDropdown variant="btn-group" autoClose={'outside'}>
            <CDropdownToggle color="primary">날짜 선택</CDropdownToggle>
            <CDropdownMenu style={{ padding: '10px' }}>
              <DayPicker
                captionLayout="dropdown"
                mode="range"
                timeZone="Asia/Seoul"
                selected={selected}
                onSelect={setSelected}
              />
              <div className="d-grid gap-2">
                <CButton
                  color="primary"
                  onClick={() => {
                    setDateClicked(!dateCLicked)
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

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                감정 변화 추이
              </h4>
              <div className="small text-body-secondary">
                {timeRange[0]}~{timeRange[1]}
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3 ">
                {emotionList.map((value, index) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={index === clickedBtn}
                    onClick={() => {
                      setClickedBtn(index)
                      console.log(index)
                      console.log(emotionList[clickedBtn])
                    }}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            <ResponsiveContainer width={800} height={500}>
              <AreaChart
                width={800}
                height={500}
                data={periodEmotion}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" ticks={timeRange} />
                <YAxis type="number" domain={[0, 100]} tickCount={3} />
                <Tooltip />
                {renderAreas()}
              </AreaChart>
            </ResponsiveContainer>
          </CRow>
        </CCardFooter>
      </CCard>

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                기간 키워드
              </h4>
              <div className="small text-body-secondary">
                {timeRange[0]}~{timeRange[1]}
              </div>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1, gutter: 4 }} sm={{ cols: 2 }} lg={{ cols: 4 }}>
            <ResponsiveContainer width="100%" height="100%">
              <CListGroup className="mb-2">
                {periodKeyword.length === 0 ? (
                  <CListGroup className="mb-2" layout={`horizontal`}>
                    <CListGroupItem
                      style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      그동안의 키워드 정보가 없습니다.
                    </CListGroupItem>
                  </CListGroup>
                ) : (
                  periodKeyword.reduce((acc, item, index, arr) => {
                    if (index % 2 === 0) {
                      const keyword1 = item
                      const keyword2 = arr[index + 1] ?? '-'
                      acc.push(
                        <CListGroup className="mb-2" layout={`horizontal`} key={index}>
                          <CListGroupItem style={{ flex: 1 }}>{keyword1}</CListGroupItem>
                          <CListGroupItem style={{ flex: 1 }}>{keyword2}</CListGroupItem>
                        </CListGroup>,
                      )
                    }
                    return acc
                  }, [])
                )}
              </CListGroup>
            </ResponsiveContainer>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default PeriodReport

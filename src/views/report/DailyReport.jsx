import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CChartDoughnut } from '@coreui/react-chartjs'
import {
  CButton,
  CCol,
  CCollapse,
  CContainer,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CListGroup,
  CListGroupItem,
  CRow,
  CSpinner,
} from '@coreui/react'
import { NavLink } from 'react-router-dom'
import { ResponsiveContainer } from 'recharts'
import Title from '../base/title/Title'
import Container from '../container/Container'
import HalfPanel from '../half-panel/half-panel'
import userTableDummy from '../../assets/dummy'
import palette from '../../assets/styles/theme'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { analyticsDates, dailyAnalyzeReport, getDangerScore } from '../../apis/customers'
import {
  getDateInfo,
  getServiceYesterdayDate as getServiceYesterdayDate,
  KOREA_TIME_OFFSET_MINUTES,
} from '../../utils/time'
import { DayPicker } from 'react-day-picker'
import styled from '@emotion/styled'

const handleSummaryKeyword = (data) => {
  if (data.isNULL) return []
  return data.keywords
}

const handleRecordedEmotion = (data) => {
  if (data.isNULL) return []
  return data.Keywords.map((item) => item.keyword)
}

const handleFeeling = (data) => {
  if (data.isNULL || !data.todayFeeling) return ''
  return data.todayFeeling
}

const handleDangerScore = (data) => {
  if (!data || !data.score) return 0
  return data.score
}

const handleDangerScoreUpdate = (data) => {
  if (!data || !data.updateTime) return ''
  return data.updateTime
}

// 데이터 전처리 함수
const handleEmotionsData = (data) => {
  if (data.isNULL) return { labels: [], percent: [] }
  const labels = data.labels.map((item) => item.label)
  const percent = data.labels.map((item) => item.percent)
  return { labels, percent }
}

// 일일 리포트를 처음 들어올 때는 들어온 날의 날짜를 보여줘야 함
// 지금은 예시로 698번의 2024-10-08일의 리포트를 보여주는 것으로 설정
const DailyReport = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [allowedDates, setAllowedDates] = useState([])
  const [nowDate, setNowDate] = useState('')
  const [selected, setSelected] = useState()
  const [dailyKeyword, setDailyKeyword] = useState([]) // 일일 키워드 분석
  const [dailyRecordedEmotion, setDailyRecordedEmotion] = useState([]) // 일일 직접 기록한 감정
  const [feeling, setFeeling] = useState('')
  const [dangerScore, setDangerScore] = useState(0)
  const [dangerUpdate, setDangerUpdate] = useState('')
  const [pieData, setPieData] = useState({ labels: [], percent: [] })

  useEffect(() => {
    analyticsDates(id, '2024')
      .then((data) => {
        setName(data.nickname)
        setAllowedDates(data.dates)
        console.log('날짜')
      })
      .catch((error) => {
        console.log('날짜 에러', error)
      })
    setNowDate(getServiceYesterdayDate().toString())
  }, [])

  useEffect(() => {
    if (selected === undefined) return
    setNowDate(getDateInfo(selected, KOREA_TIME_OFFSET_MINUTES).dateString)
  }, [selected])

  useEffect(() => {
    dailyAnalyzeReport(id, nowDate)
      .then((data) => {
        console.log('일일 리포트', data)
        // setName(data.name)
        setDailyKeyword(handleSummaryKeyword(data.summary))
        setDailyRecordedEmotion(handleRecordedEmotion(data.record))
        setFeeling(handleFeeling(data.record))
        setDangerScore(handleDangerScore(data.score))
        setDangerUpdate(handleDangerScoreUpdate(data.score))
        setPieData(handleEmotionsData(data.classification))
      })
      .catch((error) => {
        console.log('일일 리포트 에러', error)
      })

    // getDangerScore(id, getDateInfo(new Date(), KOREA_TIME_OFFSET_MINUTES).dateString)
    //   .then((data) => {
    //     console.log('위험점수', data)
    //     setDangerScore(data.score)
    //     setDangerUpdate(data.updateTime)
    //   })
    //   .catch((error) => {
    //     console.log('위험점수 에러', error)
    //   })
  }, [nowDate])

  const config = {
    type: 'doughnut',
    data: {
      labels: pieData.labels,
      datasets: [
        {
          backgroundColor: [
            palette.graph[100],
            palette.graph[200],
            palette.graph[300],
            palette.graph[400],
            palette.graph[500],
            palette.graph[600],
          ],
          data: pieData.percent,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          formatter: (value, context) => {
            let sum = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0)
            let percentage = ((value / sum) * 100).toFixed(2)
            return percentage > 10 ? percentage + '%' : '' // 10% 미만은 표시하지 않음
          },
          color: '#000000', // 텍스트 색상
          font: {
            weight: 'bold',
            size: 16,
          },
        },
        legend: {
          position: 'top', // 범례를 상단에 배치
          color: '#FFFFFF', // 제목 글자 색상
        },
        title: {
          display: true,
          text: 'AI가 분석한 감정', // 차트 제목
          color: '#FFFFFF', // 제목 글자 색상
          font: {
            size: 30, // 제목 글자 크기
          },
        },
      },
    },
    plugins: [ChartDataLabels], // 플러그인 추가
  }

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
        <Title title={`${name} (#${id})`} subtitle={`${nowDate}의 리포트입니다.`} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
          <CDropdown variant="btn-group">
            <CDropdownToggle color="primary">날짜 선택</CDropdownToggle>
            <CDropdownMenu style={{ padding: '10px' }}>
              <DayPicker
                captionLayout="dropdown"
                mode="single"
                timeZone="Asia/Seoul"
                selected={selected}
                onSelect={setSelected}
                disabled={(date) => {
                  return !allowedDates.includes(
                    getDateInfo(date, KOREA_TIME_OFFSET_MINUTES).dateString,
                  )
                }}
              />
            </CDropdownMenu>
          </CDropdown>
          <CButton
            className="align-self-center"
            color="primary"
            to={`/customers/period-report/${id}`}
            as={NavLink}
            onClick={() => {
              console.log('버튼 클릭')
            }}
          >
            기간 리포트 확인
          </CButton>
        </div>
      </div>

      <CRow className="mb-4 align-items-center">
        <CCol lg={6}>
          <HalfPanel
            subText="위험점수"
            mainText="점"
            score={dangerScore}
            detailText={`* 당일 업데이트: ${dangerUpdate}`}
          />
        </CCol>
        <CCol lg={6}>
          <div style={{ flex: '1' }}>
            <Title title="대화 주제" subtitle="내담자가 많이 언급한 주제입니다." />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {dailyKeyword.length === 0 ? (
                <CListGroup className="mb-2" layout={`horizontal`}>
                  <CListGroupItem
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    나눈 대화가 없습니다.
                  </CListGroupItem>
                </CListGroup>
              ) : (
                dailyKeyword.reduce((acc, item, index, arr) => {
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
            </div>
          </div>
        </CCol>
      </CRow>

      <CRow className="mb-4 align-items-center">
        <CCol lg={6}>
          <Container>
            <div style={{ height: '500px', width: '100%', flexDirection: 'row' }}>
              <ResponsiveContainer width="100%" height="100%">
                <CChartDoughnut {...config} />
              </ResponsiveContainer>
            </div>
          </Container>
        </CCol>
        <CCol lg={6}>
          <div style={{ flex: '1', margin: '20px 0px 20px 0px' }}>
            <Title title="내담자가 기록한 감정" subtitle="내담자가 직접 선택한 감정 단어입니다." />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {dailyRecordedEmotion.length === 0 ? (
                <CListGroup className="mb-2" layout={`horizontal`}>
                  <CListGroupItem
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    기록한 감정이 없습니다.
                  </CListGroupItem>
                </CListGroup>
              ) : (
                dailyRecordedEmotion.reduce((acc, item, index, arr) => {
                  if (index % 2 === 0) {
                    const keyword1 = item
                    const keyword2 = arr[index + 1] ?? '-'
                    acc.push(
                      <CListGroup className="mb-2" layout="horizontal" key={index}>
                        <CListGroupItem style={{ flex: 1 }}>{keyword1}</CListGroupItem>
                        <CListGroupItem style={{ flex: 1 }}>{keyword2}</CListGroupItem>
                      </CListGroup>,
                    )
                  }
                  return acc
                }, [])
              )}
            </div>
          </div>
          <div style={{ flex: '1', margin: '20px 0px 20px 0px' }}>
            <Title title="내담자의 한 줄 기록" subtitle="내담자가 직접 작성한 한 줄 기록입니다." />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CListGroup className="mb-2" layout={`horizontal`}>
                <CListGroupItem
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {feeling ? feeling : '한 줄 기록이 없습니다'}
                </CListGroupItem>
              </CListGroup>
            </div>
          </div>
        </CCol>
      </CRow>
    </>
  )
}

const CalenderContainer = styled.div`
  display: flex;
  justify-content: right;
`

export default DailyReport

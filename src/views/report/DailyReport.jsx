import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CChartDoughnut } from '@coreui/react-chartjs'
import {
  CAlert,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardText,
  CCardTitle,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { NavLink } from 'react-router-dom'
import { ResponsiveContainer } from 'recharts'
import Title from '../base/title/Title'
import Container from '../container/Container'
import HalfPanel from '../half-panel/half-panel'
import palette from '../../assets/styles/theme'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {
  analyticsDates,
  dailyAnalyzeReport,
  getDangerScore,
  requestReport,
} from '../../apis/customers'
import {
  getDateInfo,
  getServiceTodayDate,
  getServiceYesterdayDate as getServiceYesterdayDate,
  KOREA_TIME_OFFSET_MINUTES,
} from '../../utils/time'
import { DayPicker } from 'react-day-picker'
import styled from '@emotion/styled'
import CIcon from '@coreui/icons-react'
import { cilSync } from '@coreui/icons'

const getRankingText = (rank) => {
  if (rank === 1) return '1st'
  if (rank === 2) return '2nd'
  if (rank === 3) return '3rd'
  return `${rank}th`
}

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
  const [refreshButton, setRefreshButton] = useState(false)
  const [refreshText, setRefreshText] = useState('새로고침하기')

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
    setNowDate(getServiceTodayDate().toString())
  }, [])

  useEffect(() => {
    if (selected === undefined) return
    setNowDate(getDateInfo(selected, KOREA_TIME_OFFSET_MINUTES).dateString)
  }, [selected])

  const fetchDailyReport = () => {
    dailyAnalyzeReport(id, nowDate)
      .then((data) => {
        console.log('일일 리포트', data)
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
  }

  useEffect(() => {
    fetchDailyReport() // 일일 리포트 데이터 갱신 함수 호출
  }, [nowDate])

  // useEffect(() => {
  //   // 설정된 간격으로 일일 리포트 데이터 갱신
  //   const intervalId = setInterval(() => {
  //     fetchDailyReport() // 일일 리포트 데이터 갱신 함수 호출
  //   }, 3000) // 5초 간격

  //   return () => clearInterval(intervalId) // 컴포넌트 언마운트 시 간격 해제
  // }, [nowDate])

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
            let index = context.dataIndex
            return percentage > 10
              ? context.chart.data.labels[index] + '\n' + percentage + '%'
              : null // 10% 미만은 표시하지 않음
          },
          backgroundColor: '#0000009a', // 텍스트 배경색
          borderRadius: 4, // 텍스트 박스 모서리 둥글기

          color: '#ffffff', // 텍스트 색상
          font: {
            weight: 'bold',
            size: 16,
          },
        },
        legend: {
          position: 'bottom', // 범례를 상단에 배치'
          labels: {
            boxWidth: 16, // 범례 박스 크기
            padding: 16, // 범례 간격
            font: {
              size: 16, // 범례 글자 크기
            },
          },

          color: '#000000', // 제목 글자 색상
        },
        title: {
          display: false,
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
          {nowDate === getServiceTodayDate().toString() && (
            <>
              <CButton
                className="align-self-center"
                color="primary"
                as={NavLink}
                onClick={() => {
                  requestReport(id)
                  setRefreshButton(true)
                }}
              >
                <CIcon icon={cilSync} /> 감정 분석 업데이트하기
              </CButton>
              <CModal
                visible={refreshButton}
                onClose={() => setRefreshButton(false)}
                aria-labelledby="LiveDemoExampleLabel"
              >
                <CModalHeader>
                  <CModalTitle id="LiveDemoExampleLabel">감정 분석 업데이트하기</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <p>해당 사용자의 감정 분석 업데이트가 진행중입니다! 5초~10초 정도 소요됩니다. </p>
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setRefreshButton(false)}>
                    닫기
                  </CButton>
                  <CButton
                    color="primary"
                    onClick={() => {
                      setRefreshButton(false)
                    }}
                  >
                    {refreshText}
                  </CButton>
                </CModalFooter>
              </CModal>
            </>
          )}
        </div>
      </div>

      <CRow className="mb-4 align-items-start">
        <CCol lg={6}>
          <HalfPanel
            subText="위험점수"
            mainText="점"
            score={dangerScore}
            detailText={`*최종 업데이트: ${dangerUpdate}`}
          />
        </CCol>
        <CCol lg={6}>
          <div style={{ flex: '1' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CCard>
                <CCardHeader>
                  <Title title="대화 주제" subtitle="내담자가 많이 언급한 주제입니다." />
                </CCardHeader>
                <CListGroup flush className="mb-2">
                  {dailyKeyword.length === 0 ? (
                    <>
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
                    </>
                  ) : (
                    dailyKeyword.reduce((acc, item, index, arr) => {
                      acc.push(
                        <CListGroupItem
                          style={{ flex: 1 }}
                          className="d-flex justify-content-between align-items-center"
                        >
                          {item}
                          <CBadge color="primary">{getRankingText(index + 1)}</CBadge>
                        </CListGroupItem>,
                      )
                      return acc
                    }, [])
                  )}
                </CListGroup>
              </CCard>
            </div>
          </div>
        </CCol>
      </CRow>

      <CRow className="mb-4 align-items-start">
        <CCol lg={6}>
          <div>
            <CCard>
              <CCardHeader>
                <Title
                  title="내담자 감정 분석 결과"
                  subtitle="대화를 통해 분석한 내담자의 감정입니다."
                />
              </CCardHeader>
              <CListGroup flush>
                <CListGroupItem
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '1.3rem',
                  }}
                >
                  {pieData.labels.length === 0 ? (
                    <div
                      style={{
                        display: 'flex', // Flexbox 적용
                        flexDirection: 'column', // 세로 방향 정렬
                        justifyContent: 'center', // 수직 정렬
                        alignItems: 'center', // 가로 정렬
                        textAlign: 'center', // 텍스트 중앙 정렬
                        height: '100%', // 필요한 경우 부모 높이에 맞게 설정
                      }}
                    >
                      <p>대화 양이 부족하여 감정 분석이 제공되지 않습니다.</p>
                      {nowDate === getServiceTodayDate().toString() && (
                        <>
                          <CButton
                            className="align-self-center"
                            color="primary"
                            as={NavLink}
                            onClick={() => {
                              requestReport(id)
                              setRefreshButton(true)
                            }}
                          >
                            <CIcon icon={cilSync} /> 감정 분석 업데이트하기
                          </CButton>
                          <CModal
                            visible={refreshButton}
                            onClose={() => setRefreshButton(false)}
                            aria-labelledby="LiveDemoExampleLabel"
                          >
                            <CModalHeader>
                              <CModalTitle id="LiveDemoExampleLabel">
                                감정 분석 업데이트하기
                              </CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                              <p>
                                해당 사용자의 감정 분석 업데이트가 진행중입니다! 5초~10초 정도
                                소요됩니다.
                              </p>
                            </CModalBody>
                            <CModalFooter>
                              <CButton color="secondary" onClick={() => setRefreshButton(false)}>
                                닫기
                              </CButton>
                              <CButton
                                color="primary"
                                onClick={() => {
                                  setRefreshButton(false)
                                }}
                              >
                                {refreshText}
                              </CButton>
                            </CModalFooter>
                          </CModal>
                        </>
                      )}
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <CChartDoughnut {...config} />
                    </ResponsiveContainer>
                  )}
                </CListGroupItem>
              </CListGroup>
            </CCard>
          </div>
        </CCol>
        <CCol lg={6}>
          <div style={{ flex: '1', margin: '0px 0px 20px 0px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CCard>
                <CCardHeader>
                  <Title
                    title="내담자가 기록한 감정"
                    subtitle="내담자가 직접 선택한 감정 단어입니다."
                  />
                </CCardHeader>
                <CListGroup flush className="mb-2">
                  {dailyRecordedEmotion.length === 0 ? (
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
                  ) : (
                    dailyRecordedEmotion.reduce((acc, item, index, arr) => {
                      acc.push(
                        <CListGroupItem
                          style={{ flex: 1 }}
                          className="d-flex justify-content-between align-items-center"
                        >
                          {item}
                          <CBadge color="primary">{getRankingText(index + 1)}</CBadge>
                        </CListGroupItem>,
                      )
                      return acc
                    }, [])
                  )}
                </CListGroup>
              </CCard>
            </div>
          </div>
          <div style={{ flex: '1', margin: '0px 0px 20px 0px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CCard>
                <CCardHeader>
                  <Title
                    title="내담자의 한 줄 기록"
                    subtitle="내담자가 직접 작성한 한 줄 기록입니다."
                  />
                </CCardHeader>
                <CListGroup flush>
                  <CListGroupItem
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '1.3rem',
                    }}
                  >
                    {feeling ? feeling : '이 날의 한 줄 기록이 없습니다.'}
                  </CListGroupItem>
                </CListGroup>
              </CCard>
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

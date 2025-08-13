import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CChartDoughnut } from '@coreui/react-chartjs'
import {
  CBadge,
  CButton,
  CCard,
  CCardHeader,
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
  CCol,
  CProgress,
  CCollapse,
} from '@coreui/react'
import { NavLink } from 'react-router-dom'
import { ResponsiveContainer } from 'recharts'
import Title from '../base/title/Title'
import HalfPanel from '../half-panel/half-panel'
import palette from '../../assets/styles/theme'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { analyticsDates, dailyAnalyzeReport, requestReport } from '../../apis/customers'
import {
  getDateInfo,
  getServiceTodayDate,
  getServiceYesterdayDate as getServiceYesterdayDate,
  KOREA_TIME_OFFSET_MINUTES,
} from '../../utils/time'
import { DayPicker } from 'react-day-picker'
import styled from '@emotion/styled'
import ListCard from '../../components/listcard/ListCard'
import CIcon from '@coreui/icons-react'
import { cilSync, cilMenu } from '@coreui/icons'

const config = (pieData) => {
  return {
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
}

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
  console.log('recorded emotion', data.Keywords)
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
  const [modalVisible, setModalVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refreshText, setRefreshText] = useState('업데이트하기')
  const [barValue, setBarValue] = useState(0)
  const barRef = useRef(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const fetchDailyReport = () => {
    if (!nowDate) return
    dailyAnalyzeReport(id, nowDate)
      .then((data) => {
        if (!data || data.isNULL) {
          console.log('일일 리포트 데이터 없음')
          return
        }
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

  const requestRefresh = () => {
    if (refreshing) return
    setRefreshing(true)
    setRefreshText('업데이트 중...')
    increaseProgressBar(15, 100)
    requestReport(Number(id))
      .then((data) => {
        if (!data || data.result === undefined) {
          setRefreshText('네트워크 문제, 다시 시도하기')
          setRefreshing(false)
          return
        }
        if (data.result) {
          window.location.reload()
          return
        }
        if (data.reason > 0) {
          setRefreshText('대화량 부족, 다시 시도하기')
          setRefreshing(false)
        }
      })
      .catch((error) => {
        setRefreshText('네트워크 문제, 다시 시도하기')
        setRefreshing(false)
      })
      .finally(() => {
        stopProgressBar()
      })
  }

  const increaseProgressBar = (second, to) => {
    if (barRef.current) {
      clearInterval(barRef.current) // Clear any existing interval.
    }

    const cycle = second / to
    let progressValue = 0

    const intervalId = setInterval(() => {
      progressValue += 1
      console.log(progressValue)
      setBarValue(progressValue)

      if (progressValue >= 100) {
        clearInterval(intervalId) // Stop the interval once progress reaches 100.
        barRef.current = null // Reset the ref to null.
      }
    }, cycle * 1000)

    barRef.current = intervalId // Store the interval ID in the ref.
  }

  const stopProgressBar = () => {
    if (barRef.current) {
      clearInterval(barRef.current) // Stops the interval.
      barRef.current = null // Reset the reference.
    }
  }

  const handleCancelRefresh = () => {
    if (refreshing) setModalVisible(true)
    stopProgressBar()
    setRefreshText('업데이트하기')
    setModalVisible(false)
  }

  //초기 데이터 로드
  useEffect(() => {
    const currentYear = new Date().getFullYear().toString()
    analyticsDates(id, currentYear)
      .then((data) => {
        setName(data.nickname)
        setAllowedDates(data.dates)
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

  useEffect(() => {
    fetchDailyReport() // 일일 리포트 데이터 갱신 함수 호출
  }, [nowDate])

  const isToday = nowDate === getServiceTodayDate().toString()

  return (
    <>
      <CModal
        visible={modalVisible}
        alignment="center"
        onClose={() => {
          handleCancelRefresh()
        }}
      >
        <CModalHeader>
          <CModalTitle>실시간 업데이트하기</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>해당 사용자 오늘의 감정 분석을 실시간으로 업데이트하시겠습니까? </p>
          {refreshing && <CProgress color="info" variant="striped" animated value={barValue} />}
        </CModalBody>
        <CModalFooter>
          {!refreshing && (
            <CButton
              color="secondary"
              onClick={() => {
                handleCancelRefresh()
              }}
            >
              취소
            </CButton>
          )}
          <CButton
            color="primary"
            onClick={() => {
              requestRefresh()
            }}
          >
            {refreshText}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* 상단 헤더: 데스크탑 버튼 + 모바일 햄버거 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '10px 0px',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <Title title={`${name} (#${id})`} subtitle={`${nowDate}의 리포트입니다.`} />
        {/* 데스크탑 버튼 그룹 */}
        <div className="d-none d-md-flex align-items-center" style={{ gap: '0.75rem' }}>
          <CDropdown variant="btn-group" autoClose={false} visible={dropdownOpen}>
            <CDropdownToggle
              color="primary"
              onClick={() => setDropdownOpen((v) => !v)}
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
                mode="single"
                timeZone="Asia/Seoul"
                selected={selected}
                onSelect={(val) => {
                  setSelected(val)
                  // 단일 선택은 즉시 닫아도 UX 나쁠 수 있어 유지. 필요 시 아래 주석 해제
                  // setDropdownOpen(false)
                }}
                disabled={(date) =>
                  !allowedDates.includes(getDateInfo(date, KOREA_TIME_OFFSET_MINUTES).dateString)
                }
              />
            </CDropdownMenu>
          </CDropdown>

          <CButton
            color="primary"
            to={`/customers/period-report/${id}`}
            as={NavLink}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            기간 리포트 확인
          </CButton>

          {isToday && (
            <CButton
              color="primary"
              onClick={() => setModalVisible(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                gap: '0.375rem',
              }}
            >
              <CIcon icon={cilSync} />
              실시간 업데이트하기
            </CButton>
          )}
        </div>

        {/* 모바일 메뉴 토글 버튼 */}
        <CButton
          className="d-md-none"
          color="primary"
          variant="outline"
          onClick={() => setMobileMenuOpen((v) => !v)}
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
              onClick={() => setDropdownOpen((v) => !v)}
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
                mode="single"
                timeZone="Asia/Seoul"
                selected={selected}
                onSelect={(val) => setSelected(val)}
                disabled={(date) =>
                  !allowedDates.includes(getDateInfo(date, KOREA_TIME_OFFSET_MINUTES).dateString)
                }
              />
            </CDropdownMenu>
          </CDropdown>

          <CButton
            color="primary"
            to={`/customers/period-report/${id}`}
            as={NavLink}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            기간 리포트 확인
          </CButton>

          {isToday && (
            <CButton
              color="primary"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.375rem',
              }}
              onClick={() => {
                setMobileMenuOpen(false)
                setModalVisible(true)
              }}
            >
              <CIcon icon={cilSync} />
              실시간 업데이트하기
            </CButton>
          )}
        </div>
      </CCollapse>

      <CRow className="mb-4 align-items-center">
        <CCol lg={6}>
          <HalfPanel
            subText="위험점수"
            mainText="점"
            score={dangerScore}
            detailText={`*최종 업데이트: ${dangerUpdate}`}
            showPie={!refreshing}
          />
        </CCol>
        <CCol lg={6}>
          <div style={{ flex: '1' }}>
            <div>
              <ListCard title="대화 주제" subtitle="내담자가 많이 언급한 주제입니다">
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
                      </CListGroupItem>,
                    )
                    return acc
                  }, [])
                )}
              </ListCard>
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-4 align-items-start">
        <CCol lg={6}>
          <div style={{ flex: '1', margin: '0px 0px 20px 0px' }}>
            <ListCard title="감정 분석 결과" subtitle="대화를 통해 분석한 내담자의 감정입니다.">
              <CListGroupItem
                style={{
                  flex: 1,
                  display: 'flex',
                  //justifyContent: 'center',
                  //alignItems: 'center',
                  //fontSize: '1.3rem',
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
                      width: '100%',
                      minHeight: 280,
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
                            setModalVisible(true)
                          }}
                        >
                          <CIcon icon={cilSync} /> 실시간 업데이트하기
                        </CButton>
                      </>
                    )}
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <CChartDoughnut {...config(pieData)} />
                  </ResponsiveContainer>
                )}
              </CListGroupItem>
            </ListCard>
          </div>
        </CCol>
        <CCol lg={6}>
          <div style={{ flex: '1', margin: '0px 0px 20px 0px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ListCard
                title="내담자가 기록한 감정"
                subtitle="내담자가 직접 선택한 감정 단어입니다."
              >
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
                      </CListGroupItem>,
                    )
                    return acc
                  }, [])
                )}
              </ListCard>
            </div>
          </div>
          <div style={{ flex: '1', margin: '0px 0px 20px 0px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ListCard title="오늘의 일기" subtitle="내담자가 작성한 일기입니다.">
                <CListGroupItem
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    //fontSize: '1.3rem',
                  }}
                >
                  {feeling ? feeling : '이 날의 한 줄 기록이 없습니다.'}
                </CListGroupItem>
              </ListCard>
            </div>
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default DailyReport

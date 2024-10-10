import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CChartDoughnut } from '@coreui/react-chartjs'
import { CButton, CCol, CListGroup, CListGroupItem, CRow } from '@coreui/react'
import { NavLink } from 'react-router-dom'
import { ResponsiveContainer } from 'recharts'
import Title from '../base/title/Title'
import Container from '../container/Container'
import HalfPanel from '../half-panel/half-panel'
import userTableDummy from '../../assets/dummy'
import palette from '../../assets/styles/theme'
import ChartDataLabels from 'chartjs-plugin-datalabels'

// 데이터 전처리 함수
const preprocessDoughnutData = (datas) => {
  const labels = datas.map((item) => item.label)
  const percent = datas.map((item) => item.percent)
  return { labels, percent }
}

// 일일 리포트를 처음 들어올 때는 들어온 날의 날짜를 보여줘야 함
// 지금은 예시로 698번의 2024-10-08일의 리포트를 보여주는 것으로 설정
const DailyReport = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [dailyKeyword, setDailyKeyword] = useState([]) // 일일 키워드 분석
  const [dailyRecordedEmotion, setDailyRecordedEmotion] = useState([]) // 일일 직접 기록한 감정
  const [dangerscore, setDangerscore] = useState(0)
  const [pieData, setPieData] = useState({ labels: [], percent: [] })

  useEffect(() => {
    const fetchData = async () => {
      const data = userTableDummy
      const userData = data.find((item) => item.id === parseInt(id))

      if (userData) {
        setName(userData.table.name)
        setDailyKeyword(userData.daily?.dailyKeyword || [])
        setDailyRecordedEmotion(userData.daily?.dailyRecordedEmotion || [])
        setDangerscore(userData.table?.score || 0)
        setPieData(preprocessDoughnutData(userData.daily?.pieEmotionData || []))
      }
    }

    fetchData()
  }, [id])

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
        <Title title={name} subtitle={`${name}님의 일일리포트입니다.`} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
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
          <HalfPanel subText="위험점수" mainText="점" score={dangerscore} />
        </CCol>
        <CCol lg={6}>
          <div style={{ flex: '1' }}>
            <Title title="대화 주제" subtitle="내담자가 많이 언급한 주제입니다." />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {dailyKeyword.reduce((acc, item, index, arr) => {
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
              }, [])}
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
                    기록한 감정이 없습니다
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
        </CCol>
      </CRow>
    </>
  )
}

export default DailyReport

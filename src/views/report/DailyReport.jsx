import React from 'react'
import { css } from '@emotion/react'
import { useParams } from 'react-router-dom'
import Warning from '../warning/Warning'
import { CChartDoughnut } from '@coreui/react-chartjs'
import EmotionContainer from '../emotion/EmotionContainer'
import EmotionChip from '../emotion/EmotionChip'
import KeywordChip from '../keyword/KeywordChip'
import { CButton, CListGroup, CListGroupItem } from '@coreui/react'
import { NavLink } from 'react-router-dom'
import { ResponsiveContainer } from 'recharts'
import Card from '../base/cards/Card'
import palette from '../../assets/styles/theme'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import Icon from '../../components/icon/icons'
import Title from '../base/title/Title'
import Container from '../container/Container'
import { useEffect } from 'react'
import { Calendar } from 'react-date-range'
import { dailyAnalyzeReport } from '../../apis/customers'
import CalendarIcon from '../../assets/svg/calendar.svg' // Adjust the path as needed
//파이 그래프 데이터
const datas = [
  {
    label: '분노하는',
    percent: 53,
  },
  {
    label: '짜증나는',
    percent: 39,
  },
  {
    label: '충격 받은',
    percent: 2,
  },
  {
    label: '부끄러운',
    percent: 2,
  },
  {
    label: '걱정스러운',
    percent: 1,
  },
  {
    label: '기타',
    percent: 3,
  },
]
// 데이터 전처리 함수
const preprocessDoughnutData = (datas) => {
  const labels = datas.map((item) => item.label)
  const percent = datas.map((item) => item.percent)
  return { labels, percent }
}

//일일 이모션
const dailyRecordedEmotion = ['힘든', '기쁜', '슬픈', '격노한']
const colors = [
  { bg: '#E5F8F3', object: '#31B28E' },
  { bg: '#FDF9D8', object: '#FFB800' },
  { bg: '#EFECFF', object: '#A395F1' },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const RADIAN = Math.PI / 180

// 전처리한 데이터
const { labels, percent } = preprocessDoughnutData(datas)

//일일 키워드
const dailyEmotion = [
  {
    keyword: '격분한',
    group: 'angry',
  },
  {
    keyword: '굴욕적인',
    group: 'sad',
  },
  {
    keyword: '기쁜',
    group: 'happy',
  },
  {
    keyword: '차분한',
    group: 'calm',
  },
]

//일일 리포트를 처음 들어올 때는 들어온 날의 날짜를 보여줘야 함
//지금은 예시로 698번의 2024-10-08일의 리포트를 보여주는 것으로 설정
const DailyReport = () => {
  const { id } = useParams()
  const [dailyKeyword, setDailyKeyword] = React.useState([]) //일일 키워드분석
  const [dailyEmotion, setDailyEmotion] = React.useState([]) //일일 감정분석
  const [dailyRecordedEmotion, setDailyRecordedEmotion] = React.useState([]) //일일 직접 기록한 감정

  useEffect(() => {
    const fetchData = async () => {
      const data = await dailyAnalyzeReport(id, '2024-10-08')
      //console.log('data', data.data)
      //console.log('data.summary.keywords)', data.data.summary.keywords)
      //console.log('data.summary.emotions)', data.data.classification.labels)
      //console.log('data.record.Keywords)', data.data.record.Keywords)
      setDailyKeyword(data.data.summary.keywords)
      setDailyEmotion(data.data.classification.labels)
      setDailyRecordedEmotion(data.data.record.Keywords)
      console.log('data', data)
    }
    fetchData()
  }, [])

  const preprocessDoughnutData = (datas) => {
    const labels = datas.map((item) => item.label)
    const percent = datas.map((item) => Math.round(item.percent))
    return { labels, percent }
  }

  const pieData = preprocessDoughnutData(dailyEmotion)

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
          color: '#fff', // 텍스트 색상
          font: {
            weight: 'bold',
          },
        },
        legend: {
          position: 'top', // 범례를 상단에 배치
        },
        title: {
          display: true,
          text: 'AI가 분석한 감정', // 차트 제목
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
        <Title title={id} subtitle={`${id}님의 일일리포트입니다.`} />
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
            <CalendarIcon style={{ width: '1em', height: '1em' }} />
          </CButton>
          <CButton
            className="align-self-center"
            color="primary"
            to={`/customers/period-report/${id}`}
            as={NavLink}
            onClick={() => {
              console.log('버튼 클릭')
            }}
          >
            기간 리포트 확인하기
          </CButton>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: '1', marginRight: '10px' }}>
          <Card title="테스트" component={<Warning height={200} />} />
        </div>
        <div style={{ flex: '1' }}>
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
      </div>
      <Container>
        <EmotionContainer style={{ height: '500px', width: '48%', flexDirection: 'row' }}>
          <ResponsiveContainer width="100%" height="100%" flexDirection="row">
            <CChartDoughnut {...config} />
          </ResponsiveContainer>
        </EmotionContainer>
        <div style={{ flex: '1' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {dailyRecordedEmotion.reduce((acc, item, index, arr) => {
              if (index % 2 === 0) {
                const keyword1 = item.keyword
                const keyword2 = arr[index + 1]?.keyword ?? '-'
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
      </Container>
      <h2>다람쥐</h2>

      <Calendar date={new Date()} onChange={() => console.log('바뀜')} />
    </>
  )
}
export default DailyReport

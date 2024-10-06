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
//일일키워드
const dailyKeyword = [
  '친구 관계 문제일까요 아니면 부모님과의 갈등일까요 뭘까요',
  '소외감 표현',
  '불만 표출',
  '직장 괴롭힘',
  '업무 스트레스',
  '우울감 증폭',
  '공황 장애',
  '강아지 사랑',
  '친구와의 불화',
  '-',
]
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
const config = {
  type: 'doughnut',
  data: {
    labels: labels,
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
        data: percent,
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
          let percentage = (value / sum) * 100
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
const DailyReport = () => {
  const { id } = useParams()
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
        <h2>{id}의 일일 리포트</h2>
        <CButton
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: '1', marginRight: '10px' }}>
          <h3>위험 감지 그래프</h3>
          <Card title="테스트" component={<Warning height={200} />} />
        </div>
        <div style={{ flex: '1' }}>
          <h3>일상 키워드</h3>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <CListGroup className="mb-2">
              {dailyKeyword.map((keyword, keywordIndex) => (
                <CListGroupItem key={keywordIndex}>
                  {keyword || '빈 문자열 사용'} {/* 키워드가 없으면 기본 텍스트 사용 */}
                </CListGroupItem>
              ))}
            </CListGroup>
          </div>
        </div>
      </div>
      <h3>감정 데이터</h3>
      <EmotionContainer style={{ height: '500px', width: '100%', flexDirection: 'row' }}>
        <ResponsiveContainer width="100%" height="100%" flexDirection="row">
          <CChartDoughnut {...config} />
        </ResponsiveContainer>
      </EmotionContainer>

      <ResponsiveContainer width="100%" height="100%">
        <CListGroup className="mb-2">
          {dailyEmotion.map((item, keywordIndex) => (
            <CListGroupItem key={keywordIndex}>
              <Icon name={item.group} width={20} height={20} /> <span>{item.keyword || '-'} </span>
              {/* 키워드가 없으면 기본 텍스트 사용 */}
            </CListGroupItem>
          ))}
        </CListGroup>
      </ResponsiveContainer>

      {/*<EmotionContainer>
        {dailyEmotion.map((item, index) => (
          <EmotionChip text={item.keyword} group={item.group} key={index} />
        ))}
      </EmotionContainer>*/}
    </>
  )
}
export default DailyReport

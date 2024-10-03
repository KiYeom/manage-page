import React from 'react'
import { css } from '@emotion/react'
import { useParams } from 'react-router-dom'
import Warning from '../warning/Warning'
import { CChartDoughnut } from '@coreui/react-chartjs'
import EmotionContainer from '../emotion/EmotionContainer'
import EmotionChip from '../emotion/EmotionChip'
import KeywordChip from '../keyword/KeywordChip'
import { CButton } from '@coreui/react'
import { NavLink } from 'react-router-dom'

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
const dailyKeyword = ['친구 관계 문제', '소외감 표현', '불만 표출']
const colors = [
  { bg: '#E5F8F3', object: '#31B28E' },
  { bg: '#FDF9D8', object: '#FFB800' },
  { bg: '#EFECFF', object: '#A395F1' },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    ></text>
  )
}

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
          to={`/dashboard/period-report/${id}`}
          as={NavLink}
          onClick={() => {
            console.log('버튼 클릭')
          }}
        >
          기간 리포트 확인하기
        </CButton>
      </div>
      <h3>위험 감지 그래프</h3>
      <Warning />
      <h3>감정 데이터</h3>
      <div style={{ height: '500px', width: '500px' }}>
        <CChartDoughnut
          data={{
            labels: labels,
            datasets: [
              {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                data: percent,
              },
            ],
          }}
        />
      </div>
      <h2>일상 키워드</h2>
      <EmotionContainer>
        {dailyKeyword.map((item, index) => (
          <KeywordChip key={index} color={colors[index]} text={item} />
        ))}
      </EmotionContainer>
      <h2>기록한 감정 (수정하기)</h2>
      <EmotionContainer>
        {dailyEmotion.map((item, index) => (
          <EmotionChip text={item.keyword} group={item.group} key={index} />
        ))}
      </EmotionContainer>
    </>
  )
}
export default DailyReport

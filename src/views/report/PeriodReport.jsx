import React from 'react'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { CListGroup, CListGroupItem } from '@coreui/react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  CAvatar,
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useState } from 'react'
import palette from '../../assets/styles/theme'
//일일키워드
const periodKeyword = [
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
const charts = [
  {
    category: 'anger',
    chart: [
      { date: '2024-06-19', value: 34 },
      { date: '2024-06-27', value: 63 },
      { date: '2024-07-17', value: 21 },
    ],
  },
  {
    category: 'sadness',
    chart: [
      { date: '2024-06-19', value: 10 },
      { date: '2024-06-27', value: 60 },
      { date: '2024-07-17', value: 30 },
    ],
  },
  {
    category: 'nerve',
    chart: [
      { date: '2024-06-19', value: 100 },
      { date: '2024-06-27', value: 90 },
      { date: '2024-07-17', value: 80 },
    ],
  },
  {
    category: 'hurt',
    chart: [
      { date: '2024-06-19', value: 80 },
      { date: '2024-06-27', value: 0 },
      { date: '2024-07-17', value: 1 },
    ],
  },
  {
    category: 'embarrassment',
    chart: [
      { date: '2024-06-19', value: 10 },
      { date: '2024-06-27', value: 30 },
      { date: '2024-07-17', value: 20 },
    ],
  },
  {
    category: 'happy',
    chart: [
      { date: '2024-06-19', value: 10 },
      { date: '2024-06-27', value: 60 },
      { date: '2024-07-17', value: 30 },
    ],
  },
]
const emotionList = ['all', 'anger', 'sadness', 'nerve', 'hurt', 'embarrassment', 'happy']

const mergeData = () => {
  // 각 감정의 데이터를 날짜별로 병합
  const angerData = charts[0].chart
  const sadnessData = charts[1].chart
  const nerveData = charts[2].chart
  const hurtData = charts[3].chart
  const embarrassmentData = charts[4].chart
  const happyData = charts[5].chart

  // 병합된 데이터를 반환
  return angerData.map((angerItem, index) => ({
    date: angerItem.date,
    anger: angerItem.value,
    sadness: sadnessData[index].value,
    nerve: nerveData[index].value,
    hurt: hurtData[index].value,
    embarrassment: embarrassmentData[index].value,
    happy: happyData[index].value,
  }))
}
const PeriodReport = () => {
  const data = mergeData()
  const [clickedBtn, setClickedBtn] = useState(0)
  const { id } = useParams()

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
        <h2>{id}의 기간 리포트</h2>
        <CButton
          color="primary"
          to={`/customers/daily-report/${id}`}
          as={NavLink}
          onClick={() => {
            console.log('버튼 클릭')
          }}
        >
          일일리포트 확인하기
        </CButton>
      </div>

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                감정 변화 추이
              </h4>
              <div className="small text-body-secondary">2024-06-19 ~ 2024-07-17</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
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
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" ticks={['2024-06-19', '2024-07-17']} />
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
              <div className="small text-body-secondary">2024-06-19 ~ 2024-07-17</div>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center justify-content-center align-item-center"
          >
            <ResponsiveContainer width="100%" height="100%">
              <CListGroup className="mb-2">
                {periodKeyword.map((keyword, keywordIndex) => (
                  <CListGroupItem key={keywordIndex}>
                    {keyword || '-'} {/* 키워드가 없으면 기본 텍스트 사용 */}
                  </CListGroupItem>
                ))}
              </CListGroup>
            </ResponsiveContainer>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default PeriodReport

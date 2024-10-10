import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCol, CRow } from '@coreui/react'
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
import { periodAnalyzeReport } from '../../apis/customers'

const emotionList = ['all', 'anger', 'sadness', 'nerve', 'hurt', 'embarrassment', 'happy']

const mergeData = (charts) => {
  // 각 감정의 데이터를 날짜별로 병합
  const angerData = charts[0].chart
  const sadnessData = charts[1].chart
  const nerveData = charts[2].chart
  const hurtData = charts[3].chart
  const embarrassmentData = charts[4].chart
  const happyData = charts[5].chart

  const mergeDataResult = angerData.map((angerItem, index) => ({
    date: angerItem.date,
    anger: angerItem.value,
    sadness: sadnessData[index].value,
    nerve: nerveData[index].value,
    hurt: hurtData[index].value,
    embarrassment: embarrassmentData[index].value,
    happy: happyData[index].value,
  }))

  // 병합된 데이터를 반환
  return mergeDataResult
}

const PeriodReport = () => {
  const [clickedBtn, setClickedBtn] = useState(0)
  const { id } = useParams()
  const [data, setData] = useState([])
  const [periodEmotion, setPeriodEmotion] = useState([]) // 기간 감정분석
  const [startDate, setStartDate] = useState('2024-10-02')
  const [endDate, setEndDate] = useState('2024-10-09')

  useEffect(() => {
    console.log('기간 분석')
    const fetchData = async () => {
      try {
        const response = await periodAnalyzeReport(id, startDate, endDate) // id, startdate, enddate
        console.log('api result', response)
        const mergedData = mergeData(response.data.charts)
        setData(mergedData) //감정 변화 추이 데이터
        setPeriodEmotion(response.data.data.classification.labels)
      } catch (error) {
        console.log('기간 분석 에러', error)
        return
      }
    }
    fetchData()
  }, [id, startDate, endDate])

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
              <div className="small text-body-secondary">
                {startDate} ~ {endDate}
              </div>
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
                <XAxis dataKey="date" ticks={[startDate, endDate]} />
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
                {startDate} ~ {endDate}
              </div>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1, gutter: 4 }} sm={{ cols: 2 }} lg={{ cols: 4 }}>
            {/* Add your content here */}
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default PeriodReport

import React, { useEffect } from 'react'
import {
  CBadge,
  CButton,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { dailyAnalyzeStatus } from '../../apis/customers'

// 사용자 데이터를 외부에서 가져오기
import userTableDummy from '../../assets/dummy'

const CustomersTable = () => {
  const [userTable, setUserTable] = React.useState([])

  useEffect(() => {
    // API 대신 제공된 데이터를 사용하여 userTable 설정
    const formattedData = userTableDummy.map((user) => ({
      user: {
        name: user.table.name,
        id: user.id,
        registered: user.table.last,
      },
      usage: {
        value: user.table.score,
        color: getProgressColor(user.table.score),
      },
      emotions: [user.table.emotion],
      activity: user.table.first,
    }))

    // score가 높은 순으로 정렬
    formattedData.sort((a, b) => b.usage.value - a.usage.value)

    setUserTable(formattedData)
  }, [])

  //안전, 위험, 매우 위험을 구분하는 함수
  const dangerLevel = (value) => {
    if (value <= 60) {
      return '안전'
    } else if (value <= 85) {
      return '위험'
    } else {
      return '매우 위험'
    }
  }

  //안전, 위험, 매우 위험에 따라 bar의 색상을 바꿔주는 함수
  const getProgressColor = (value) => {
    if (value <= 60) {
      return 'success'
    } else if (value <= 85) {
      return 'warning'
    } else {
      return 'danger'
    }
  }

  const navigateToReport = (type, id, name) => {
    const url = `/#/customers/${type}-report/${id}`
    window.location.href = url
  }

  return (
    <>
      <br />
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary">내담자</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">위험지수</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">일일 리포트</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">기간 리포트</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">감정 분석</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">상담 시작 날짜</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {userTable.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>
                <div>{item.user.name}</div>
                <div className="small text-body-secondary text-nowrap">
                  마지막 대화: {item.user.registered}
                </div>
              </CTableDataCell>

              <CTableDataCell>
                <div className="d-flex justify-content-between text-nowrap">
                  <div className="fw-semibold">
                    {item.usage.value}% {dangerLevel(item.usage.value)}
                  </div>
                </div>
                <CProgress
                  thin
                  color={getProgressColor(item.usage.value)}
                  value={item.usage.value}
                />
              </CTableDataCell>

              <CTableDataCell>
                <CButton color="primary" onClick={() => navigateToReport('daily', item.user.id)}>
                  일일 리포트
                </CButton>
              </CTableDataCell>

              <CTableDataCell>
                <CButton color="primary" onClick={() => navigateToReport('period', item.user.id)}>
                  기간 리포트
                </CButton>
              </CTableDataCell>

              <CTableDataCell>
                <div className={'flex-column'} style={{ display: 'flex' }}>
                  {item.emotions.map((emotion, index) => (
                    <CBadge key={index} textBgColor="info" style={{ margin: '4px' }}>
                      {emotion}
                    </CBadge>
                  ))}
                </div>
              </CTableDataCell>

              <CTableDataCell>
                <div className="fw-semibold text-nowrap">{item.activity}</div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <br />
    </>
  )
}

export default CustomersTable

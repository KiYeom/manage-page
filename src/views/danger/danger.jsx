import React from 'react'

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
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import react, { useEffect } from 'react'
import userTableDummy from '../../assets/dummy'

const Danger = () => {
  const [userTable, setUserTable] = React.useState([])
  useEffect(() => {
    // userTableDummy 데이터를 score 높은 순으로 정렬하여 상태에 저장
    const sortedData = [...userTableDummy].sort((a, b) => b.table.score - a.table.score)
    setUserTable(sortedData)
  }, [])

  const dangerLevel = (value) => {
    if (value <= 60) {
      return '안전'
    } else if (value <= 85) {
      return '위험'
    } else {
      return '매우 위험'
    }
  }

  const getProgressColor = (value) => {
    if (value <= 60) {
      return 'success'
    } else if (value <= 85) {
      return 'warning'
    } else {
      return 'danger'
    }
  }

  const navigateToReport = (type, id) => {
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
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {userTable.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>
                <div>{item.table.name}</div>
                <div className="small text-body-secondary text-nowrap">
                  마지막 대화: {'\n'}
                  {item.table.last}
                </div>
              </CTableDataCell>

              <CTableDataCell>
                <div className="d-flex justify-content-between text-nowrap">
                  <div className="fw-semibold">
                    {item.table.score}% {dangerLevel(item.table.score)}
                  </div>
                </div>
                <CProgress
                  thin
                  color={getProgressColor(item.table.score)}
                  value={item.table.score}
                />
              </CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" onClick={() => navigateToReport('daily', item.table.id)}>
                  일일 리포트
                </CButton>
              </CTableDataCell>

              <CTableDataCell>
                <CButton color="primary" onClick={() => navigateToReport('period', item.table.id)}>
                  기간 리포트
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <br />
    </>
  )
}

export default Danger

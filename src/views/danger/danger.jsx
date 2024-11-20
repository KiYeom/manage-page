import React from 'react'

import {
  CButton,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import PropTypes from 'prop-types'

const Danger = ({ userTable }) => {
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
            <CTableHeaderCell className="bg-body-tertiary">위험점수</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">일일 리포트</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">기간 리포트</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {userTable.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>
                <div>
                  <span>{item.nickname}</span>
                  <span className="small text-body-secondary text-nowrap"> #{item.id}</span>
                </div>
                <div className="small text-body-secondary text-nowrap">
                  마지막 대화: {item.lastTime ? item.lastTime : '정보 없음'}
                </div>
              </CTableDataCell>

              <CTableDataCell>
                <div className="fw-semibold">
                  {item.score?.score === null || item.score?.score === undefined
                    ? '없음'
                    : `${item.score.score}% ${dangerLevel(item.score.score)}`}
                </div>
                <CProgress
                  thin
                  color={getProgressColor(Math.floor(item.score?.score ?? 0))}
                  value={Math.floor(item.score?.score ?? 0)}
                />
                <div className="small text-body-secondary text-nowrap">
                  업데이트: {item.score?.updateTime ? item.score.updateTime : '정보 없음'}
                </div>
                {/* <div className="d-flex justify-content-between text-nowrap">
                  <div className="fw-semibold">
                    {item.score?.score === null || item.score?.score === undefined
                      ? '없음'
                      : `${item.score.score}% ${dangerLevel(item.score.score)}`}
                  </div>
                  <div className="small text-body-secondary text-nowrap">
                    업데이트: {item.lastTime ? item.lastTime : '정보 없음'}
                  </div>
                </div> */}
              </CTableDataCell>

              <CTableDataCell>
                <CButton color="primary" onClick={() => navigateToReport('daily', item.id)}>
                  일일 리포트
                </CButton>
              </CTableDataCell>

              <CTableDataCell>
                <CButton color="primary" onClick={() => navigateToReport('period', item.id)}>
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

Danger.propTypes = {
  userTable: PropTypes.array,
}

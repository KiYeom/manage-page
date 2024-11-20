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
import PropTypes from 'prop-types'
import { se } from 'react-day-picker/locale'
import { th } from 'react-day-picker/locale'

const CustomersTable = ({ data }) => {
  const [userTable, setUserTable] = React.useState([])

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const formattedData = data.map((user) => ({
        id: user.id,
        nickname: user.nickname,
        score: user.score ? user.score : null,
        lastTime: user.lastTime,
        firstTime: user.firstTime,
        highestEmotion: user.emotion ? user.emotion.highestEmotion : null,
        secondEmotion: user.emotion ? user.emotion.secondEmotion : null,
        thirdEmotion: user.emotion ? user.emotion.thirdEmotion : null,
        emotionUpdateTime: user.emotion ? user.emotion.dateString : null,
      }))

      // score가 높은 순으로 정렬
      formattedData.sort((a, b) => (b.score || 0) - (a.score || 0))

      setUserTable(formattedData)
    }
  }, [data])

  const dangerLevel = (value) => {
    if (value === null) return '정보 없음'
    if (value <= 60) {
      return '안전'
    } else if (value <= 85) {
      return '위험'
    } else {
      return '매우 위험'
    }
  }

  const getProgressColor = (value) => {
    if (value === null) return 'secondary'
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
            <CTableHeaderCell className="bg-body-tertiary">
              일일 리포트&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">
              기간 리포트&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">감정 분석</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">상담 시작 날짜</CTableHeaderCell>
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
                  {item.score === null
                    ? '없음'
                    : `${item.score.score}% ${dangerLevel(item.score.score)}`}
                </div>
                <CProgress
                  thin
                  color={getProgressColor(item.score ? item.score.score : 0)}
                  value={item.score ? item.score.score : 0}
                />
                <div className="small text-body-secondary text-nowrap">
                  업데이트: {item.score?.updateTime ? item.score.updateTime : '정보 없음'}
                </div>
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

              <CTableDataCell>
                <div className={'flex-column'} style={{ display: 'flex' }}>
                  {item.highestEmotion ? (
                    <>
                      <div className={'flex-row'} style={{ display: 'flex' }}>
                        <CBadge textBgColor="primary" textColor="white" style={{ margin: '4px' }}>
                          {item.highestEmotion}
                        </CBadge>
                        {item.secondEmotion && (
                          <CBadge textBgColor="info" textColor="white" style={{ margin: '4px' }}>
                            {item.secondEmotion}
                          </CBadge>
                        )}
                        {item.thirdEmotion && (
                          <CBadge textBgColor="warning" textColor="white" style={{ margin: '4px' }}>
                            {item.thirdEmotion}
                          </CBadge>
                        )}
                      </div>
                      <div className="small text-body-secondary text-nowrap">
                        업데이트: {item.emotionUpdateTime ? item.emotionUpdateTime : '정보 없음'}
                      </div>
                    </>
                  ) : (
                    '정보 없음'
                  )}
                </div>
              </CTableDataCell>

              <CTableDataCell>
                <div className="fw-semibold text-nowrap">{item.firstTime}</div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <br />
    </>
  )
}

CustomersTable.propTypes = {
  data: PropTypes.array,
}

export default CustomersTable

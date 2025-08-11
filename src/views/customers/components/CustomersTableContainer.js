//전체 내담자의 정보를 보여주는 UserTable 컴포넌트에
//필요한 데이터를 처리하고 전달하는 컨테이너 컴포넌트
import React, { useEffect, useState } from 'react'
import { dangerLevel, getProgressColor, navigateToReport } from '../../../utils/tableUtils'
import UserTable from '../../../components/table/UserTable'
import {
    CButton,
    CProgress,
    CTableRow,
    CTableDataCell
} from '@coreui/react'
const CustomersTableContainer = ({ data }) => {
  const headers = ['내담자', '위험 점수', '일일 리포트', '기간 리포트', '감정 분석', '상담 시작 날짜']
  const renderRow = (item) => (
    <CTableRow key={item.id}>
      <CTableDataCell>{item.nickname}</CTableDataCell>
      <CTableDataCell>
        <div className="fw-semibold">
          {dangerLevel(item.score?.score)}
        </div>
        <CProgress color={getProgressColor(item.score?.score)} value={item.score?.score} />
      </CTableDataCell>
      <CTableDataCell>
        <CButton color="primary" onClick={() => navigateToReport('daily', item.id)}>일일 리포트</CButton>
      </CTableDataCell>
      <CTableDataCell>
        <CButton color="primary" onClick={() => navigateToReport('period', item.id)}>기간 리포트</CButton>
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
        <div className="text-nowrap">{item.firstTime}</div>
    </CTableDataCell>
    </CTableRow>
  )
  return (<UserTable headers={headers} items={data} renderRow={renderRow} />)
}
export default CustomersTableContainer
//대시보드 페이지에 필요한 내담자 데이터를 처리하고
//UserTable 에 전달하는 컨테이너 컴포넌트
import React, { useEffect, useState } from 'react'
import UserTable from '../../../components/table/UserTable'
import { dangerLevel, getProgressColor, navigateToReport } from '../../../utils/tableUtils'
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

const DashboardUserTableContainer = ({userTable}) => {
    const headers = ['내담자', '위험 점수', '일일 리포트', '기간 리포트'];
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
    </CTableRow>
  );
  return (<UserTable headers={headers} items={userTable} renderRow={renderRow} />);
}
export default DashboardUserTableContainer;
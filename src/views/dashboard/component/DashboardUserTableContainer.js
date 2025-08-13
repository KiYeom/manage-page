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
      <CTableDataCell>
        <div>
          <span>{item.nickname}</span>
          <span className="small text-body-secondary text-nowrap">
            {' '}
            #{item.id}
          </span>
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
          업데이트:{' '}
          {item.score?.updateTime ? item.score.updateTime : '정보 없음'}
        </div>
      </CTableDataCell>
      <CTableDataCell>
        <CButton className="text-nowrap" color="primary" onClick={() => navigateToReport('daily', item.id)}>일일 리포트</CButton>
      </CTableDataCell>
      <CTableDataCell>
        <CButton className="text-nowrap" color="primary" onClick={() => navigateToReport('period', item.id)}>기간 리포트</CButton>
      </CTableDataCell>
    </CTableRow>
  );
  return (<UserTable headers={headers} items={userTable} renderRow={renderRow} />);
}
export default DashboardUserTableContainer;
//대시보드 페이지와 내담자 관리 페이지에서 사용하는 테이블 UI
import React from 'react'
import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell } from '@coreui/react' 
import { de } from 'react-day-picker/locale';
const UserTable = ({ headers, items, renderRow }) => {
  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      {/* 테이블의 헤더 */}
      <CTableHead>
        <CTableRow>
          {headers.map((header, index) => (
            <CTableHeaderCell className = "text-nowrap" key={index}>{header}</CTableHeaderCell>
          ))}
        </CTableRow>
      </CTableHead>
      {/* 테이블의 바디 */}
      <CTableBody>
        {items.map((item) => renderRow(item))}
      </CTableBody>
    </CTable>
  );
};
export default UserTable;
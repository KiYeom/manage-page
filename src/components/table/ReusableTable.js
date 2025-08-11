//대비소드 페이지와 내담자 관리 페이지에서 사용하는 테이블
//내담자의 위험 점수, 감정 등을 간단하게 파악하는 테이블
import React from 'react'
import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow, CTableDataCell } from '@coreui/react' 
import { de } from 'react-day-picker/locale';
const ReusableTable = ({ headers, items, renderRow }) => {
  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          {headers.map((header, index) => (
            <CTableHeaderCell key={index}>{header}</CTableHeaderCell>
          ))}
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {items.map((item, index) => renderRow(item, index))}
      </CTableBody>
    </CTable>
  );
};
export default ReusableTable;
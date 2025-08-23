// components/table/UserTable.jsx
import React from 'react';
import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';

const UserTable = ({ headers, children, emptyText = '데이터 없음' }) => {
  console.log('children', children);
  const hasChildren = React.Children.count(children) > 0;
  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead>
        <CTableRow>
          {headers.map((header, idx) => (
            <CTableHeaderCell className="text-nowrap" key={idx}>
              {header}
            </CTableHeaderCell>
          ))}
        </CTableRow>
      </CTableHead>

      <CTableBody>
        {hasChildren ? (
          children
        ) : (
          <CTableRow>
            <td colSpan={headers.length}>{emptyText}</td>
          </CTableRow>
        )}
      </CTableBody>
    </CTable>
  );
};

export default UserTable;

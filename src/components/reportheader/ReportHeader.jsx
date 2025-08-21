// components/reportheader/ReportHeader.js

import React, { useState } from 'react';
import Title from '../../views/base/title/Title';
import { CButton, CCollapse } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';

const ReportHeader = ({ customerId, customerName, timeRange, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 0px',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <Title
          title={`${customerName} (#${customerId})`}
          subtitle={`${timeRange[0]}~${timeRange[1]}의 리포트입니다.`}
        />

        {/* 데스크탑: children을 그대로 렌더링 */}
        <div className="d-none d-md-flex align-items-center" style={{ gap: '0.75rem' }}>
          {children}
        </div>

        {/* 모바일 토글 버튼 */}
        <CButton
          className="d-md-none"
          color="primary"
          variant="outline"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CButton>
      </div>

      {/* 모바일 메뉴: children을 CCollapse 안에 렌더링 */}
      <CCollapse visible={mobileMenuOpen} className="d-md-none mb-3">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{children}</div>
      </CCollapse>
    </>
  );
};

export default ReportHeader;

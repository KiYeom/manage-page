// src/components/listcard/ListCard.js

import { CListGroup, CListGroupItem, CSpinner } from '@coreui/react';
import React from 'react';
import Card from '../card/Card'; // Card 컴포넌트 경로 확인

//N개의 리스트 형태의 데이터를 표시하는 컨테이너
const ListCard = ({ title, subtitle, isLoading, data, renderItem, emptyMessage, listProps }) => {
  return (
    <Card title={title} subtitle={subtitle}>
      <CListGroup flush {...listProps}>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center py-4">
            <CSpinner color="primary" />
          </div>
        ) : data && data.length > 0 ? (
          data.map((item, index) => renderItem(item, index))
        ) : (
          <CListGroupItem className="text-center text-muted py-4">
            {emptyMessage || '데이터가 없습니다.'}
          </CListGroupItem>
        )}
      </CListGroup>
    </Card>
  );
};

export default ListCard;

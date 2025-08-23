import { CListGroup, CListGroupItem, CSpinner } from '@coreui/react';
import React from 'react';
import Card from '../card/Card';

const ListCard = ({
  title,
  subtitle,
  isLoading,
  data,
  renderItem,
  emptyMessage,
  listProps,
  className,
  style,
}) => {
  return (
    <Card
      title={title}
      subtitle={subtitle}
      className={className}
      style={style}
      noBodyPadding={true}
    >
      <CListGroup
        flush
        className="flex-fill d-flex flex-column justify-content-center"
        {...listProps}
      >
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center py-4 flex-fill">
            <CSpinner color="primary" />
          </div>
        ) : data && data.length > 0 ? (
          <div className="d-flex flex-column justify-content-start flex-fill">
            {data.map((item, index) => renderItem(item, index, data))}
          </div>
        ) : (
          <CListGroupItem className="text-center text-muted py-4 flex-fill d-flex align-items-center justify-content-center border-0">
            {emptyMessage || '데이터가 없습니다.'}
          </CListGroupItem>
        )}
      </CListGroup>
    </Card>
  );
};

export default ListCard;

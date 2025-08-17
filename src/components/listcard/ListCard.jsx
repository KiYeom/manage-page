import { CCard, CCardHeader, CListGroup } from '@coreui/react';
import React from 'react';
import Title from '../../views/base/title/Title';
import Card from '../card/Card';

const ListCard = ({ title, subtitle, children, listProps }) => {
  return (
    <Card title={title} subtitle={subtitle}>
      <CListGroup flush {...listProps}>
        {children}
      </CListGroup>
    </Card>
  );
};
export default ListCard;

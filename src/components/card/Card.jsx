// components/Card.jsx - 새로운 범용 Card 컴포넌트
import { CCard, CCardHeader, CCardBody, CCardFooter } from '@coreui/react'
import React from 'react'
import Title from '../../views/base/title/Title'

const Card = ({ title, subtitle, header, children, footer, bodyProps, footerProps }) => {
  return (
    <CCard className="mb-4">
      <CCardHeader>{header ? header : <Title title={title} subtitle={subtitle} />}</CCardHeader>
      {children && <CCardBody {...bodyProps}>{children}</CCardBody>}
      {footer && <CCardFooter {...footerProps}>{footer}</CCardFooter>}
    </CCard>
  )
}

export default Card

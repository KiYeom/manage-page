import React from 'react'
import PropTypes from 'prop-types'
import { CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react'
import { CRow, CCol } from '@coreui/react'
const Card = ({ title, component }) => {
  return (
    <CCard style={{ backgroundColor: '#2B303C', height: '100%' }}>
      <CCardBody style={{ backgroundColor: '#2B303C' }}>
        <CCardTitle>{title}</CCardTitle>
        <CRow>
          <CCol>
            <span style={{ fontSize: '30px' }}>점수 : 60점</span>
          </CCol>
          <CCol>
            {component ?? component}
            {/*<CCardText style={{ backgroundColor: 'blue' }}>컴포넌트</CCardText>*/}
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}
Card.propTypes = {
  title: PropTypes.string,
  component: PropTypes.any,
}

export default Card

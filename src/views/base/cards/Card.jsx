import React from 'react'
import PropTypes from 'prop-types'
import { CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react'
import { CRow, CCol } from '@coreui/react'
import palette from '../../../assets/styles/theme'
const Card = ({ title, component }) => {
  return (
    <CCard style={{ backgroundColor: '#2B303C', height: '100%', border: '1px solid white' }}>
      <CCardBody style={{ backgroundColor: '#2B303C' }}>
        <CCardTitle style={{ backgroundColor: 'pink', fontSize: '15px' }}>
          <h4>{title}</h4>
        </CCardTitle>

        {/* 반응형 CRow */}
        <CRow
          className="align-items-center"
          style={{ backgroundColor: 'blue', display: 'flex', flexWrap: 'wrap' }}
        >
          {/* 큰 화면에서는 6열, 작은 화면에서는 12열로 변화 CCol xs="12" md="6" */}
          <CCol lg="12" xl="6">
            <h1
              style={{
                color: palette.primary[500],
                backgroundColor: 'orange',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              60점
            </h1>
          </CCol>
          {/* 큰 화면에서는 6열, 작은 화면에서는 12열로 변화 */}
          <CCol lg="12" xl="6" style={{ backgroundColor: 'gray' }}>
            {component ?? component}
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

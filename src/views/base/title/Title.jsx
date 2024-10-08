import React from 'react'
import PropTypes from 'prop-types'
import { CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react'
import { CRow, CCol } from '@coreui/react'
import palette from '../../../assets/styles/theme'

const Title = ({ title, subtitle }) => {
  return (
    <div>
      <h3>{title}</h3>
      <h6
        style={{
          color: palette.web[50],
        }}
      >
        {subtitle}
      </h6>
    </div>
  )
}

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.any,
}

export default Title

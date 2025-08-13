import React from 'react'
import PropTypes from 'prop-types'
import { CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react'
import { CRow, CCol } from '@coreui/react'
import palette from '../../../assets/styles/theme'

const Title = ({ title, subtitle }) => {
  return (
    <div>
      <h4 id="traffic" className="card-title mb-0">
        {title}
      </h4>
      <div className="small text-body-secondary">{subtitle}</div>
    </div>
  )
}

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.any,
}

export default Title

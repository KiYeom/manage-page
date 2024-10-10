import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'

const Page500 = () => {
  const navigateToPre = () => {
    window.history.back()
  }
  const navigateToHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix">
              <h1 className="float-start display-3 me-4">500</h1>
              <h4 className="pt-3">일시적인 문제가 발생했습니다!</h4>
              <p className="text-body-secondary float-start">
                지속적으로 생길 시 연락주시기 바랍니다. 이메일: admin@remind4u.co.kr
              </p>
            </span>
          </CCol>
          <CButton color="primary" size="lg" onClick={navigateToPre}>
            이전 페이지로 돌아가기
          </CButton>
          <br />
          <CButton color="secondary" size="lg" onClick={navigateToHome}>
            홈페이지로 돌아가기
          </CButton>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page500

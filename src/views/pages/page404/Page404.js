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

const Page404 = () => {
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
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">알 수 없는 페이지입니다.</h4>
              <p className="text-body-secondary float-start">
                페이지가 잘못되었거나 이동할 수 없습니다.
              </p>
            </div>
          </CCol>
          <CButton color="primary" size="lg" onClick={navigateToPre}>
            이전 페이지로 돌아가기
          </CButton>
          <CButton color="secondary" size="lg" onClick={navigateToHome}>
            홈페이지로 돌아가기
          </CButton>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404

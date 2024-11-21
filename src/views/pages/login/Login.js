import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
  CToastHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { emailLogin } from '../../../apis/auth'
import { getRefreshToken, setTokenInfo } from '../../../storages/storages'
import CTAButton from '../../buttons/cta-button'

const Login = () => {
  const [loading, setLoading] = React.useState(false)
  const [email, setEmail] = React.useState('soma@soma.com')
  const [emailError, setEmailError] = React.useState('')
  const [password, setPassword] = React.useState('somasoma')

  const handleLogin = () => {
    //버튼 비활성화
    setLoading(true)
    //로그인 요청
    emailLogin(email, password)
      .then((res) => {
        //성공하면 토큰 저장하고 대시보드 페이지로 이동
        setTokenInfo(res.accessToken, res.refreshToken)
      })
      .catch((error) => {
        alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.')
      })
      .finally(() => {
        //버튼 활성화
        window.location.href = '/'
        setLoading(false)
      })
  }

  useEffect(() => {
    localStorage.setItem('coreui-free-react-admin-template-theme', 'light')
    //토큰이 있으면 대시보드 페이지로 이동
    if (getRefreshToken()) {
      window.location.href = '/'
    }
  }, [])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    if (!validateEmail(value)) {
      setEmailError('유효한 이메일 주소를 입력하세요.')
    } else {
      setEmailError('')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="text-white bg-primary py-5" style={{ width: '100%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>reMIND 관리자 페이지</h2>
                    <p>reMIND 관리자 페이지에 오신 것을 환영합니다.</p>
                  </div>
                </CCardBody>
              </CCard>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>로그인</h1>
                    <p className="text-body-secondary">이메일을 통해 로그인하기</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="이메일"
                        autoComplete="username"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </CInputGroup>
                    {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="비밀번호"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleLogin}
                          disabled={loading || !email || !password || emailError}
                        >
                          로그인
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      {/* <CTAButton /> */}
    </div>
  )
}

export default Login

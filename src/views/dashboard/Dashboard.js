import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import Card from '../base/cards/Card'
import CardDropdown from '../base/cards/CardDropdown'
import Warning from '../warning/Warning'
import Title from '../base/title/Title'
import {
  CAvatar,
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CForm,
  CFormLabel,
  CNavLink,
} from '@coreui/react'
import Icon from '../../components/icon/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem } from '@coreui/react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import Danger from '../danger/danger'
import { dailyAnalyzeStatus } from '../../apis/customers'
import { useEffect } from 'react'
import EmotionContainer from '../emotion/EmotionContainer'

const Dashboard = () => {
  useEffect(() => {
    dailyAnalyzeStatus().then((res) => {
      console.log(res)
    }, [])
  }, [])

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  const userTable = [
    {
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      usage: {
        value: 50,
        color: 'success',
      },
      emotions: ['a', 'b', 'c'],
      activity: '10 sec ago',
    },
    {
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2023',
      },
      usage: {
        value: 22,
        color: 'info',
      },
      emotions: ['a', 'b', 'c'],
      activity: '5 minutes ago',
    },
    {
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      usage: {
        value: 74,
        color: 'warning',
      },
      emotions: ['a', 'b', 'c'],
      activity: '1 hour ago',
    },
    {
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      emotions: ['a', 'b', 'c'],
      activity: 'Last month',
    },
    {
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2023',
      },
      usage: {
        value: 50,
        color: 'success',
      },
      emotions: ['a', 'b', 'c'],
      activity: '10 sec ago',
    },
    {
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2023',
      },
      usage: {
        value: 22,
        color: 'info',
      },
      emotions: ['a', 'b', 'c'],
      activity: '5 minutes ago',
    },
    {
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      usage: {
        value: 74,
        color: 'warning',
      },
      emotions: ['a', 'b', 'c'],
      activity: '1 hour ago',
    },
    {
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      emotions: ['a', 'b', 'c'],
      activity: 'Last month',
    },
    {
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
      usage: {
        value: 74,
        color: 'warning',
      },
      emotions: ['a', 'b', 'c'],
      activity: '1 hour ago',
    },
    {
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
      usage: {
        value: 98,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'danger',
      },
      emotions: ['a', 'b', 'c'],
      activity: 'Last month',
    },
  ]

  return (
    <>
      <Title title="위험 지수" subtitle="전체 내댐자의 위험 상황을 한 눈에 확인할 수 있습니다." />
      <CRow className="mb-4">
        <CCol lg={6} style={{}}>
          <EmotionContainer>
            <div
              style={{
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                //width: '100%',
                backgroundColor: '#2B303C',
                borderRadius: '10px',
                padding: '10px',
                alignItems: 'center',
                height: '100%',
                //backgroundColor: '#F3F4F7',
              }}
            >
              <div
                style={{
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2B303C',
                  borderRadius: '10px',
                  padding: '10px',
                  textAlign: 'center',
                }}
              >
                <h6>전체 내담자 위험점수</h6>
                <h2>60점</h2>
              </div>
            </div>
            <Warning height={350} />
          </EmotionContainer>
        </CCol>
        <CCol lg={6} style={{ backgroundColor: '#2B303C' }}>
          {/*<CardDropdown className="mb-4" />*/}
          <CardDropdown />
        </CCol>
      </CRow>

      <br />
      <Title title="내담자 간단 확인" subtitle="위험한 내담자의 상황을 한 눈에 볼 수 있습니다." />
      <Danger />
    </>
  )
}

export default Dashboard

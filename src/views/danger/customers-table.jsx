//위험 감지 테이블
import React from 'react'

import {
  CBadge,
  CButton,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
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
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import EmotionContainer from '../emotion/EmotionContainer'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import react, { useEffect } from 'react'
import { dailyAnalyzeStatus } from '../../apis/customers'

const CustomersTable = () => {
  const [userTable, setUserTable] = React.useState([])
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await dailyAnalyzeStatus()
        // API로부터 받은 데이터를 userTable 형식에 맞게 변환하여 상태에 저장
        console.log('response!', response)
        const formattedData = response.map((user) => ({
          user: {
            name: user.nickname,
            id: user.id,
            //new: user.newUser,
            registered: user.birthdate,
          },
          usage: {
            value: 60,
            color: getProgressColor(60),
          },
          emotions: ['기쁜', '행복한'], // 감정 목록
          activity: '2024-06-17', // 마지막 활동 시간
        }))
        console.log('formattedData:', formattedData)
        setUserTable(formattedData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
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
        name: 'Yiorgos Avraamu..',
        new: true,
        registered: 'Jan 1, 2023',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 70,
        period: 'Jun 11, 2023 - Jul 10, 2023',
        color: 'red', //막대기 색상
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

  //안전, 위험, 매우 위험을 구분하는 함수
  const dangerLevel = (value) => {
    if (value <= 60) {
      return '안전'
    } else if (value <= 85) {
      return '위험'
    } else {
      return '매우 위험'
    }
  }
  //안전, 위험, 매우 위험에 따라 bar의 색상을 바꿔주는 함수
  const getProgressColor = (value) => {
    if (value <= 60) {
      return 'success'
    } else if (value <= 85) {
      return 'warning'
    } else {
      return 'danger'
    }
  }

  const navigateToReport = (type, id, name) => {
    const url = `/#/customers/${type}-report/${id}`
    window.location.href = url
  }

  return (
    <>
      <br />
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary">내담자</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">일일 리포트</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">기간 리포트</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">위험지수</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">감정 분석</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">상담 시작 날짜</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {userTable.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell>
                <div>{item.user.name}</div>
                <div className="small text-body-secondary text-nowrap">
                  마지막 대화: {item.user.registered}
                </div>
              </CTableDataCell>

              <CTableDataCell>
                <CButton color="primary" onClick={() => navigateToReport('daily', item.user.id)}>
                  일일 리포트
                </CButton>
              </CTableDataCell>

              <CTableDataCell>
                <CButton color="primary" onClick={() => navigateToReport('period', item.user.id)}>
                  기간 리포트
                </CButton>
              </CTableDataCell>

              <CTableDataCell>
                <div className="d-flex justify-content-between text-nowrap">
                  <div className="fw-semibold">
                    {item.usage.value}% {dangerLevel(item.usage.value)}
                  </div>
                </div>
                <CProgress
                  thin
                  color={getProgressColor(item.usage.value)}
                  value={item.usage.value}
                />
              </CTableDataCell>

              <CTableDataCell>
                <div className={'flex-column'} style={{ display: 'flex' }}>
                  {item.emotions.map((emotion, index) => (
                    <CBadge key={index} textBgColor="info" style={{ margin: '4px' }}>
                      {emotion}
                    </CBadge>
                  ))}
                </div>
              </CTableDataCell>

              <CTableDataCell>
                <div className="fw-semibold text-nowrap">{item.activity}</div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <br />
    </>
  )
}

export default CustomersTable

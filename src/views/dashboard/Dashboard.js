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
import { manageUsers } from '../../apis/customers'
import { useEffect } from 'react'
import EmotionContainer from '../emotion/EmotionContainer'
import WarningTest from '../half-panel/half-pie'
import HalfPanel from '../half-panel/half-panel'
import FullPanel from '../full-panel/full-panel'

const getScoreArray = (userTable) => {
  const scores = []
  for (let i = 0; i < userTable.length; i++) {
    const user = userTable[i]
    if (user.score !== null && user.score.score !== null) {
      scores.push(user.score.score)
    } else {
      scores.push(null)
    }
  }
  // return [96, 92, 85, 82, 73, 25, null, 99, 2]
  return scores
}

const Dashboard = () => {
  const [userTable, setUserTable] = React.useState([])
  const [userScores, setUserScores] = React.useState([])
  useEffect(() => {
    manageUsers()
      .then((data) => {
        const userData = data.sort((a, b) => {
          if (a.score === null && b.score === null) {
            return 0 // 둘 다 score가 null인 경우 원래 순서 유지
          }
          if (a.score === null) {
            return 1 // a의 score가 null이면 b보다 뒤로
          }
          if (b.score === null) {
            return -1 // b의 score가 null이면 a보다 뒤로
          }
          return b.score.score - a.score.score // score 값이 있는 경우 큰 값이 먼저 오도록 정렬
        })
        setUserTable(userData)
        setUserScores(getScoreArray(userData))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <Title title="위험 지수" subtitle="전체 내댐자의 위험 상황을 한 눈에 확인할 수 있습니다." />
      <CRow className="mb-4 align-items-center">
        <CCol lg={6}>
          <HalfPanel
            subText="전체 내담자 위험점수"
            mainText="점"
            score={userScores
              .filter((score) => score !== null)
              .reduce((a, b, _, arr) => a + b / arr.length, 0)}
          />
        </CCol>
        <CCol lg={6}>
          <CardDropdown scores={userScores} />
        </CCol>
      </CRow>

      <br />
      <Title
        title="내담자 상태 파악하기"
        subtitle="위험한 내담자의 상황을 한 눈에 볼 수 있습니다."
      />
      <Danger userTable={userTable} />
    </>
  )
}

export default Dashboard

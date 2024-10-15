import React, { useEffect } from 'react'
import classNames from 'classnames'
import { CNavItem, CNavLink } from '@coreui/react'
import { NavLink } from 'react-router-dom'
import { CForm, CFormInput, CFormLabel } from '@coreui/react'
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
import Danger from '../danger/danger'
import CustomersTable from '../danger/customers-table'
import { manageUsers } from '../../apis/customers'

const Customers = () => {
  const [userTable, setUserTable] = React.useState([])
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
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const navigateToReport = (type, id) => {
    const url = `/#/customers/${type}-report/${id}`
    window.location.href = url
  }

  return (
    <>
      <Title title="전체 내담자 정보" subtitle="전체 내담자의 정보를 한 눈에 확인할 수 있습니다" />
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CustomersTable data={userTable} />
      </CTable>
    </>
  )
}

export default Customers

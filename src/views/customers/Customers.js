import React from 'react'
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

const Customers = () => {
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
  ]

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

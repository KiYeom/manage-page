import React from 'react'
import classNames from 'classnames'
import { PureComponent } from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts'
import { CChartDoughnut } from '@coreui/react-chartjs'
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
import EmotionContainer from '../emotion/EmotionContainer'
import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { Calendar } from 'react-date-range'
import EmotionChip from '../emotion/EmotionChip'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { curveCardinal } from 'd3-shape'
import KeywordChip from '../keyword/KeywordChip'
import Icon from '../../components/icon/icons'

const Daily = () => {
  const [date, setDate] = React.useState(new Date())

  const handleSelect = (date) => {
    console.log(date)
    setDate(date)
  }

  return (
    <>
      <Calendar date={date} onChange={handleSelect} />
      <br />
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary">내담자</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">위험신호 감지</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">최근 감정 분석</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary">최근 활동</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {userTable.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell>
                <div>{item.user.name + ' #' + item.user.id}</div>
                <div className="small text-body-secondary text-nowrap">
                  상담 시작 시간: {item.user.registered}
                </div>
              </CTableDataCell>

              <CTableDataCell>
                <div className="d-flex justify-content-between text-nowrap">
                  <div className="fw-semibold">{item.usage.value}%</div>
                </div>
                <CProgress thin color={item.usage.color} value={item.usage.value} />
              </CTableDataCell>

              <CTableDataCell>
                <div style={{ display: 'flex' }}>
                  {item.emotions.map((emotion, index) => (
                    <CBadge key={index} textBgColor="info">
                      {emotion}
                    </CBadge>
                  ))}
                </div>
              </CTableDataCell>

              <CTableDataCell>
                <div className="small text-body-secondary text-nowrap">최근 대화 시간</div>
                <div className="fw-semibold text-nowrap">{item.activity}</div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <br />
      <h1>아래부터 예제입니다람쥐 일일분석.</h1>
      <br />
    </>
  )
}

export default Daily

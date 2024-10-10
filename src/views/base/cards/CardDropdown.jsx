import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Warning from '../../warning/Warning'
import EmotionContainer from '../../emotion/EmotionContainer'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import Card from './Card'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import FullPie from '../../full-panel/full-pie'
import { ResponsiveContainer } from 'recharts'
import FullPanel from '../../full-panel/full-panel'
const dataSafe = [
  { name: '안전한 사람', value: 60 },
  { name: '', value: 100 - 60 },
]

const dataRisk = [
  { name: '위험한 사람', value: 30 },
  { name: '', value: 100 - 30 },
]

const dataVeryRisk = [
  { name: '매우 위험한 사람', value: 10 },
  { name: '', value: 100 - 10 },
]

const CardDropdown = () => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <div style={{ padding: '10px' }}>
      <CRow sm={{ cols: 2 }} xs={{ cols: 1 }} gutter={{ row: 4, col: 4 }}>
        <CCol>
          <FullPanel subText={'안전한 사람'} mainText={'명'} score={30} />
        </CCol>
        <CCol>
          <FullPanel subText={'안전한 사람'} mainText={'명'} score={30} />
        </CCol>
      </CRow>
      <CRow sm={{ cols: 2 }} xs={{ cols: 1 }} gutter={{ row: 4, col: 4 }}>
        <CCol></CCol>
        <CCol></CCol>
      </CRow>
    </div>
  )
}

CardDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default CardDropdown

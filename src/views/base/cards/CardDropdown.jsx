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

const CardDropdown = ({ scores }) => {
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

  const veryRiskClients = scores.filter((score) => score >= 85).length
  const riskClients = scores.filter((score) => score >= 60 && score < 85).length
  const safeClients = scores.filter((score) => score < 60).length
  const noRecordClients = scores.filter((score) => score === null).length
  const totalClients = scores.length
  const totalPieData = [
    {
      name: '매우 위험',
      value: veryRiskClients,
    },
    {
      name: '위험',
      value: riskClients,
    },
    {
      name: '안전',
      value: safeClients,
    },
  ]

  return (
    <div style={{ padding: '10px' }}>
      <CRow sm={{ cols: 2 }} xs={{ cols: 1 }} gutter={{ row: 4, col: 4 }}>
        <CCol>
          <FullPanel
            subText={'전체 내담자'}
            mainText={'명'}
            score={totalClients}
            pieData={totalPieData}
            highlight={-1}
          />
        </CCol>
        <CCol>
          <FullPanel
            subText={'매우 위험한 내담자'}
            mainText={'명'}
            score={veryRiskClients}
            pieData={totalPieData}
            highlight={0}
          />
        </CCol>
      </CRow>
      <CRow sm={{ cols: 2 }} xs={{ cols: 1 }} gutter={{ row: 4, col: 4 }}>
        <CCol>
          <FullPanel
            subText={'위험한 내담자'}
            mainText={'명'}
            score={riskClients}
            pieData={totalPieData}
            highlight={1}
          />
        </CCol>
        <CCol>
          <FullPanel
            subText={'안전한 내담자'}
            mainText={'명'}
            score={safeClients}
            pieData={totalPieData}
            highlight={2}
          />
          <div>*기록 없음: {noRecordClients}명 포함</div>
        </CCol>
      </CRow>
    </div>
  )
}

CardDropdown.propTypes = {
  scores: PropTypes.array,
}

export default CardDropdown

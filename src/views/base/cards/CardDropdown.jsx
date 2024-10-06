import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Warning from '../../warning/Warning'

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

const CardDropdown = (props) => {
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
    <CRow style={{ backgroundColor: 'blue' }}>
      <CRow className={props.className}>
        <CCol>
          <Card title="위험1" />
        </CCol>
        <CCol>
          <Card title="위험2" component={<Warning />} />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <Card title="위험3" component={<Warning />} />
        </CCol>
        <CCol>
          <Card title="위험4" component={<Warning />} />
        </CCol>
      </CRow>
    </CRow>
  )
}

CardDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default CardDropdown

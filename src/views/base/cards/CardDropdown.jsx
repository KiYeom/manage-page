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
import DonutChart from '../dount/DountChart'
import { ResponsiveContainer } from 'recharts'
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
          <div
            style={{
              //backgroundColor: 'pink',
              width: '300px',
              height: '300px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                color: 'white',
                //backgroundColor: 'red',
                flexGrow: 1,
                whiteSpace: 'nowrap',
              }}
            >
              <h6>전체 인원</h6>
              <h2>100명</h2>
            </div>
            <DonutChart data={dataRisk} />
          </div>
        </CCol>
        <CCol>
          <div
            style={{
              //backgroundColor: 'pink',
              width: '300px',
              height: '300px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                color: 'white',
                //backgroundColor: 'red',
                flexGrow: 1,
                whiteSpace: 'nowrap',
              }}
            >
              <h6>안전한사람</h6>
              <h2>60명</h2>
            </div>
            <div style={{ flexGrow: 2 }}>
              {' '}
              {/* DonutChart가 남은 공간을 차지 */}
              <ResponsiveContainer width="100%" height="100%">
                <DonutChart data={dataSafe} />
              </ResponsiveContainer>
            </div>
          </div>
        </CCol>
      </CRow>

      <CRow sm={{ cols: 2 }} xs={{ cols: 1 }} gutter={{ row: 4, col: 4 }}>
        <CCol>
          <div
            style={{
              //backgroundColor: 'pink',
              width: '300px',
              height: '300px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                color: 'white',
                //backgroundColor: 'red',
                flexGrow: 1,
                whiteSpace: 'nowrap',
              }}
            >
              <h6>위험한 사람</h6>
              <h2>30명</h2>
            </div>
            <DonutChart data={dataRisk} />
          </div>
        </CCol>
        <CCol>
          <div
            style={{
              //backgroundColor: 'pink',
              width: '300px',
              height: '300px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                color: 'white',
                //backgroundColor: 'red',
                flexGrow: 1,
                whiteSpace: 'nowrap',
              }}
            >
              <h6>매우 위험한 사람</h6>
              <h2>10명</h2>
            </div>
            <DonutChart data={dataVeryRisk} />
          </div>
        </CCol>
      </CRow>
    </div>
  )
}

CardDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default CardDropdown

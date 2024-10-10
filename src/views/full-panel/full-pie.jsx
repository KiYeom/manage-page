import React, { useState, useEffect, useRef } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import palette from '../../assets/styles/theme'
import styled from '@emotion/styled'

const COLORS = [palette.web[50], palette.web[300], palette.web[300], palette.web[400]]

const data = [
  { name: 'A', value: 60, color: palette.web[200] },
  { name: 'B', value: 25, color: palette.web[100] },
  { name: 'C', value: 15, color: palette.web[300] },
]

const FullPie = () => {
  const containerRef = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleResize = (entries) => {
      if (entries[0].contentRect) {
        setWidth(entries[0].contentRect.width)
      }
    }

    const resizeObserver = new ResizeObserver((entries) => handleResize(entries))
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])

  const height = width
  const cx = width / 2
  const cy = width / 2
  const iR = width / 4
  const oR = width / 2

  return (
    <PieContainer ref={containerRef}>
      <PieChart width={width + 8} height={height + 8}>
        <Pie
          data={data}
          dataKey="value"
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill={palette.web[200]}
          startAngle={90} // 시작 각도 설정
          endAngle={450} // 끝 각도 설정
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </PieContainer>
  )
}

const PieContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export default FullPie

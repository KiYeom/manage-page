/* eslint-disable no-shadow */
import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const RADIAN = Math.PI / 180
const data = [
  { name: 'A', value: 80, color: '#00a829' },
  { name: 'B', value: 10, color: '#0093ff' },
  { name: 'C', value: 10, color: '#FF3E3E' },
]
const iR = 50
const oR = 100
const value = 60

const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0
  data.forEach((v) => {
    total += v.value
  })

  const ang = 180.0 * (1 - value / total) // 바늘의 각도 계산
  const length = (iR + 2 * oR) / 3 // 바늘의 길이 계산
  const sin = Math.sin(-RADIAN * ang)
  const cos = Math.cos(-RADIAN * ang)
  const r = 5 // 바늘의 시작점 원 반지름
  const x0 = cx // 중심점 x 좌표
  const y0 = cy // 중심점 y 좌표
  const xba = x0 + r * sin // 바늘 시작점 x 좌표
  const yba = y0 - r * cos // 바늘 시작점 y 좌표
  const xbb = x0 - r * sin // 바늘 반대쪽 끝 x 좌표
  const ybb = y0 + r * cos // 바늘 반대쪽 끝 y 좌표
  const xp = x0 + length * cos // 바늘 끝 x 좌표
  const yp = y0 + length * sin // 바늘 끝 y 좌표

  return (
    <>
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />
      <path d={`M${xba},${yba} L${xbb},${ybb} L${xp},${yp} Z`} stroke="none" fill={color} />
    </>
  )
}

const Warning = ({ height }) => {
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // 초기 크기 설정

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const cx = dimensions.width / 2
  const cy = dimensions.height / 2

  return (
    <div ref={containerRef} style={{ width: '100%', height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%" // 중심을 %로 설정
            cy="50%" // 중심을 %로 설정
            innerRadius={iR}
            outerRadius={oR}
            fill="#8884d8"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {needle(value, data, cx, cy, iR, oR, 'white')} {/* 바늘의 cx와 cy를 계산된 픽셀로 설정 */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Warning

Warning.propTypes = {
  height: PropTypes.number,
}

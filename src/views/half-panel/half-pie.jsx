import React, { useState, useEffect, useRef } from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import palette from '../../assets/styles/theme'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const RADIAN = Math.PI / 180

const data = [
  { name: 'A', value: 60, color: palette.web[200] },
  { name: 'B', value: 25, color: palette.web[100] },
  { name: 'C', value: 15, color: palette.web[300] },
]

const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0
  data.forEach((v) => {
    total += v.value
  })
  const ang = 180.0 * (1 - value / total)
  const length = (iR + 2 * oR) / 3
  const sin = Math.sin(-RADIAN * ang)
  const cos = Math.cos(-RADIAN * ang)
  const r = 5
  const x0 = cx + 5
  const y0 = cy + 5
  const xba = x0 + r * sin
  const yba = y0 - r * cos
  const xbb = x0 - r * sin
  const ybb = y0 + r * cos
  const xp = x0 + length * cos
  const yp = y0 + length * sin

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" key={Math.random()} />,
    <path
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="#none"
      fill={color}
      key={Math.random()}
    />,
  ]
}

const HalfPie = ({ score }) => {
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

  const height = width / 2
  const cx = width / 2
  const cy = width / 2
  const iR = width / 4
  const oR = width / 2

  // 바늘 애니메이션 시작
  const [targetValue, setTargetValue] = useState(0)
  const animationRef = useRef(null)

  useEffect(() => {
    const startValue = 0
    const endValue = score // 목표 점수
    const duration = 1000 // 애니메이션 지속 시간 (밀리초)
    const frameRate = 1000 / 60 // 60fps
    const totalFrames = duration / frameRate
    let currentFrame = 0

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const animate = () => {
      currentFrame++
      const progress = easeInOutCubic(currentFrame / totalFrames)
      const newValue = startValue + (endValue - startValue) * progress
      setTargetValue(newValue) // 애니메이션 진행에 따라 바늘 값 업데이트

      if (currentFrame < totalFrames) {
        animationRef.current = requestAnimationFrame(animate) // 다음 프레임 요청
      }
    }

    animationRef.current = requestAnimationFrame(animate) // 애니메이션 시작

    return () => {
      cancelAnimationFrame(animationRef.current) // 컴포넌트 언마운트 시 애니메이션 정지
    }
  }, [score])
  // 바늘 애니메이션 끝

  return (
    <PieContainer ref={containerRef}>
      {width > 0 && (
        <PieChart width={width + 10} height={height + 10}>
          <Pie
            dataKey="value"
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            fill="#8884d8"
            stroke="none"
            startAngle={180}
            endAngle={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {needle(targetValue, data, cx, cy, iR, oR, '#ffffff')}
        </PieChart>
      )}
    </PieContainer>
  )
}

const PieContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export default HalfPie

HalfPie.propTypes = {
  score: PropTypes.number,
}

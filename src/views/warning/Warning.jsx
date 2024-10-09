import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import palette from '../../assets/styles/theme'

const RADIAN = Math.PI / 180
const data = [
  { name: 'A', value: 60, color: palette.web[200] },
  { name: 'B', value: 25, color: palette.web[100] },
  { name: 'C', value: 15, color: palette.web[300] },
]
const targetValue = 60

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
  const x0 = cx
  const y0 = cy
  const xba = x0 + r * sin
  const yba = y0 - r * cos
  const xbb = x0 - r * sin
  const ybb = y0 + r * cos
  const xp = x0 + length * cos
  const yp = y0 + length * sin

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
  const [currentValue, setCurrentValue] = useState(0)

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
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    let start = null
    const duration = 500

    const animateNeedle = (timestamp) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const newValue = Math.min((progress / duration) * targetValue, targetValue)
      setCurrentValue(newValue)

      if (progress < duration) {
        requestAnimationFrame(animateNeedle)
      }
    }

    requestAnimationFrame(animateNeedle)
  }, [])

  const cx = dimensions.width / 2
  const cy = dimensions.height / 2
  const radius = Math.min(dimensions.width, dimensions.height) / 2.5

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: height + 30,
        padding: 0,
        backgroundColor: 'transparent',
        flexGrow: 1,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={radius * 0.6}
            outerRadius={radius}
            paddingAngle={0}
            fill={palette.web[100]}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {needle(currentValue, data, cx, cy, radius * 0.6, radius, 'white')}
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Warning

Warning.propTypes = {
  height: PropTypes.number,
}

import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import palette from '../../../assets/styles/theme'

const COLORS = [palette.web[50], palette.web[300], palette.web[300], palette.web[400]]

const DonutChart = ({ data }) => {
  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="30%" // 더 큰 값으로 설정하여 얇은 테두리 만들기
          outerRadius="50%" // 비율로 설정
          fill={palette.web[200]}
          dataKey="value"
          startAngle={90} // 시작 각도 설정
          endAngle={450} // 끝 각도 설정
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default DonutChart

// src/views/report/components/DailyDoughnutChart.js

import React from 'react';
import { CCard, CCardHeader, CListGroupItem } from '@coreui/react';
import { CChartDoughnut } from '@coreui/react-chartjs';
import { ResponsiveContainer } from 'recharts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import palette from '../../assets/styles/theme'; // 팔레트 색상 가져오기

const config = (pieData) => {
  return {
    type: 'doughnut',
    data: {
      //labels: pieData.labels,
      datasets: [
        {
          backgroundColor: [
            palette.graph[100],
            palette.graph[200],
            palette.graph[300],
            palette.graph[400],
            palette.graph[500],
            palette.graph[600],
          ],
          data: pieData.percent,
        },
      ],
    },
    options: {
      /* ... 기존과 동일한 options ... */
      plugins: {
        legend: {
          display: false,
        },
      },
    },
    plugins: [ChartDataLabels],
  };
};

const DailyDoughnutChart = ({ pieData }) => {
  console.log('piedata', pieData);
  if (!pieData || pieData.labels.length === 0) return null;
  return <CChartDoughnut {...config(pieData)} />;
};

export default DailyDoughnutChart;

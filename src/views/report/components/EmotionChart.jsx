import React from 'react';
import { CButton, CButtonGroup, CCol, CRow } from '@coreui/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Card from '../../../components/card/Card';
import palette from '../../../assets/styles/theme';
import Title from '../../base/title/Title';

const emotionList = ['all', 'anger', 'sadness', 'nerve', 'hurt', 'embarrassment', 'happy'];
const emotionListKorean = ['전체', '분노', '슬픔', '불안', '상처', '당황', '기쁨'];

const getValueKorean = (value) => {
  return emotionListKorean[emotionList.indexOf(value)];
};

const EmotionChart = ({ periodEmotion, timeRange, selectedEmotion, onEmotionSelect }) => {
  console.log('EmotionChart data:', periodEmotion);
  const renderAreas = () => {
    if (selectedEmotion === 0) {
      return emotionList
        .slice(1)
        .map((emotion, index) => (
          <Area
            key={emotion}
            type="monotone"
            dataKey={emotion}
            stroke={palette.graph[(index + 1) * 100]}
            fillOpacity={0.3}
            fill={palette.graph[(index + 1) * 100]}
          />
        ));
    } else {
      return (
        <Area
          type="monotone"
          dataKey={emotionList[selectedEmotion]}
          stroke={palette.graph[selectedEmotion * 100]}
          fill={palette.graph[selectedEmotion * 100]}
          fillOpacity={0.3}
        />
      );
    }
  };

  const headerContent = (
    <CRow>
      <CCol sm={5}>
        <Title title="감정 변화 추이" subtitle={`${timeRange[0]}~${timeRange[1]}`} />
      </CCol>
      <CCol sm={7} className="d-none d-md-block">
        <CButtonGroup role="group" className="float-end me-3">
          {emotionList.map((value, index) => (
            <CButton
              color="outline-secondary"
              key={value}
              className="mx-0"
              active={index === selectedEmotion}
              onClick={() => onEmotionSelect(index)}
            >
              {getValueKorean(value)}
            </CButton>
          ))}
        </CButtonGroup>
      </CCol>
    </CRow>
  );

  const chartContent = (
    <CRow
      xs={{ cols: 1, gutter: 4 }}
      sm={{ cols: 2 }}
      lg={{ cols: 4 }}
      xl={{ cols: 5 }}
      className="mb-2 text-center"
    >
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div style={{ minWidth: '600px' }}>
          <ResponsiveContainer height={500}>
            <AreaChart
              data={periodEmotion}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" ticks={timeRange} />
              <YAxis type="number" domain={[0, 100]} tickCount={5} />
              <Tooltip />
              {renderAreas()}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CRow>
  );

  return (
    <Card
      title={null} // headerContent에서 직접 처리
      subtitle={null}
      header={headerContent}
    >
      {chartContent}
    </Card>
  );
};

export default EmotionChart;

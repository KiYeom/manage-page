//위험 지수 섹션
//전체 내담자의 위험 지수를 요약하여 보여줌
import React from 'react';
import { CRow, CCol } from '@coreui/react';
import HalfPanel from '../half-panel/half-panel';
import CardDropdown from '../base/cards/CardDropdown';
import Title from '../base/title/Title';

const RiskIndexSection = ({ averageScore, userScores }) => {
  return (
    <>
      <Title title="위험 지수" subtitle="전체 내담자의 위험 상황을 한 눈에 확인할 수 있습니다." />
      <CRow className="mb-4 align-items-center">
        <CCol lg={6}>
          {/* averageScore를 HalfPanel에 전달 */}
          <HalfPanel
            subText="전체 내담자 위험점수"
            mainText="점"
            score={averageScore}
            showPie={true}
          />
        </CCol>
        <CCol lg={6}>
          {/* userScores를 CardDropdown에 전달 */}
          <CardDropdown scores={userScores} />
        </CCol>
      </CRow>
    </>
  );
};
export default RiskIndexSection;

// /views/base/cards/CardDropdown.js

import React from 'react';
import PropTypes from 'prop-types';
import { CRow, CCol } from '@coreui/react';
import FullPanel from '../../full-panel/full-panel';

// props로 scores 배열 대신 계산된 숫자들을 직접 받음
const CardDropdown = ({
  totalClients,
  veryRiskClients,
  riskClients,
  safeClients,
  noRecordClients,
}) => {
  // useEffect와 ref 관련 코드는 차트가 없으므로 제거 가능 (만약 FullPanel 내부에 차트가 없다면)

  // totalPieData는 여전히 필요
  const totalPieData = [
    { name: '매우 위험', value: veryRiskClients },
    { name: '위험', value: riskClients },
    { name: '안전', value: safeClients },
  ];

  return (
    <div style={{ padding: '10px' }}>
      <CRow sm={{ cols: 2 }}>
        <CCol className="mb-3">
          <FullPanel
            subText={'전체 내담자'}
            mainText={'명'}
            score={totalClients} // props로 받은 값 사용
            pieData={totalPieData}
            highlight={-1}
          />
        </CCol>
        <CCol className="mb-3">
          <FullPanel
            subText={'긴급 내담자'}
            mainText={'명'}
            score={veryRiskClients} // props로 받은 값 사용
            pieData={totalPieData}
            highlight={0}
          />
        </CCol>
      </CRow>
      <CRow sm={{ cols: 2 }}>
        <CCol className="mb-3 mb-sm-0">
          <FullPanel
            subText={'위험 내담자'}
            mainText={'명'}
            score={riskClients} // props로 받은 값 사용
            pieData={totalPieData}
            highlight={1}
          />
        </CCol>
        <CCol>
          <FullPanel
            subText={'일반 내담자'}
            mainText={'명'}
            score={safeClients} // props로 받은 값 사용
            pieData={totalPieData}
            highlight={2}
          />
          {/* props로 받은 값 사용 */}
          <div>*기록 없음: {noRecordClients}명 포함</div>
        </CCol>
      </CRow>
    </div>
  );
};

CardDropdown.propTypes = {
  totalClients: PropTypes.number,
  veryRiskClients: PropTypes.number,
  riskClients: PropTypes.number,
  safeClients: PropTypes.number,
  noRecordClients: PropTypes.number,
};

export default CardDropdown;

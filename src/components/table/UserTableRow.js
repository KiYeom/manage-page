//테이블의 ROW를 담당하는 UI 컴포넌트
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { CTableRow, CTableDataCell, CButton, CProgress, CBadge } from '@coreui/react';
import { dangerLevel, getProgressColor } from '../../utils/tableUtils';

/**
 * 단일 내담자 행 UI 컴포넌트
 * @param {Object} props
 * @param {Object} props.item - 내담자 데이터
 * @param {Function} props.onNavigate - (type: 'daily' | 'period', id: string | number) => void
 */
const UserTableRow = ({ item, onNavigate }) => {
  const id = item?.id;
  const nickname = item?.nickname ?? '이름 없음';
  const lastTime = item?.lastTime ?? '정보 없음';
  const firstTime = item?.firstTime ?? '정보 없음';

  const scoreValue = item?.score?.score ?? null;
  const scoreText = scoreValue === null ? '없음' : `${scoreValue}% ${dangerLevel(scoreValue)}`;
  const scoreUpdatedAt = item?.score?.updateTime ?? '정보 없음';
  const progressValue = typeof scoreValue === 'number' ? scoreValue : 0;
  const progressColor = getProgressColor(progressValue);

  const highestEmotion = item?.highestEmotion;
  const secondEmotion = item?.secondEmotion;
  const thirdEmotion = item?.thirdEmotion;
  const emotionUpdatedAt = item?.emotionUpdateTime ?? '정보 없음';

  const handleNavigate = (type) => {
    if (typeof onNavigate === 'function') onNavigate(type, id);
  };

  return (
    <CTableRow key={id}>
      {/* 내담자 정보 */}
      <CTableDataCell>
        <div>
          <span>{nickname}</span>
          <span className="small text-body-secondary text-nowrap"> #{id}</span>
        </div>
        <div className="small text-body-secondary text-nowrap">마지막 대화: {lastTime}</div>
      </CTableDataCell>

      {/* 위험 점수 */}
      <CTableDataCell>
        <div className="fw-semibold">{scoreText}</div>
        {scoreValue !== null ? (
          <>
            <CProgress thin color={progressColor} value={progressValue} />
            <div className="small text-body-secondary text-nowrap">업데이트: {scoreUpdatedAt}</div>
          </>
        ) : (
          <div className="small text-body-secondary text-nowrap">점수 없음</div>
        )}
      </CTableDataCell>

      {/* 일일 리포트 버튼 */}
      <CTableDataCell>
        <CButton className="text-nowrap" color="primary" onClick={() => handleNavigate('daily')}>
          일일 리포트
        </CButton>
      </CTableDataCell>

      {/* 기간 리포트 버튼 */}
      <CTableDataCell>
        <CButton className="text-nowrap" color="primary" onClick={() => handleNavigate('period')}>
          기간 리포트
        </CButton>
      </CTableDataCell>

      {/* 감정 분석 */}
      <CTableDataCell>
        <div className="d-flex flex-column">
          {highestEmotion ? (
            <>
              <div className="d-flex flex-row flex-wrap">
                <CBadge color="primary" textColor="white" className="me-1 mb-1">
                  {highestEmotion}
                </CBadge>
                {secondEmotion && (
                  <CBadge color="info" textColor="white" className="me-1 mb-1">
                    {secondEmotion}
                  </CBadge>
                )}
                {thirdEmotion && (
                  <CBadge color="warning" textColor="white" className="me-1 mb-1">
                    {thirdEmotion}
                  </CBadge>
                )}
              </div>
              <div className="small text-body-secondary text-nowrap">
                업데이트: {emotionUpdatedAt}
              </div>
            </>
          ) : (
            '정보 없음'
          )}
        </div>
      </CTableDataCell>

      {/* 상담 시작 날짜 */}
      <CTableDataCell>
        <div className="text-nowrap">{firstTime}</div>
      </CTableDataCell>
    </CTableRow>
  );
};

UserTableRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nickname: PropTypes.string,
    lastTime: PropTypes.string,
    firstTime: PropTypes.string,
    score: PropTypes.shape({
      score: PropTypes.number, // 0~100
      updateTime: PropTypes.string,
    }),
    highestEmotion: PropTypes.string,
    secondEmotion: PropTypes.string,
    thirdEmotion: PropTypes.string,
    emotionUpdateTime: PropTypes.string,
  }).isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default memo(UserTableRow);

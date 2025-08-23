// containers/ClientStatusContainer.jsx
import React, { useMemo, useCallback } from 'react';
import Title from '../../views/base/title/Title';
import UserTable from '../../components/table/UserTable';
import { CButton, CProgress, CTableRow, CTableDataCell, CBadge } from '@coreui/react';
import { dangerLevel, getProgressColor, navigateToReport } from '../../utils/tableUtils';
import { navigateToReport as navigateToReportUtil } from '../../utils/tableUtils';

const CustomersContainer = ({ userTable, onNavigate }) => {
  console.log('hih', userTable);
  const headers = [
    '내담자',
    '위험 점수',
    '일일 리포트',
    '기간 리포트',
    '감정 분석',
    '상담 시작 날짜',
  ];
  const handleNavigate = useCallback(
    (type, id) => {
      if (typeof onNavigate === 'function') {
        onNavigate(type, id);
      } else {
        // fallback to util
        navigateToReportUtil(type, id);
      }
    },
    [onNavigate]
  );
  console.log('customersContainer', userTable);
  return (
    <>
      <Title title="내담자 상태" subtitle="전체 내담자의 상태를 한 눈에 확인할 수 있습니다." />
      <UserTable headers={headers}>
        {userTable.map((item) => (
          <CTableRow key={item.id}>
            {/* 내담자 성함 */}
            <CTableDataCell>
              <div>
                <span>{item.nickname}</span>
                <span className="small text-body-secondary text-nowrap"> #{item.id}</span>
              </div>
              <div className="small text-body-secondary text-nowrap">
                마지막 대화: {item.lastTime ?? '정보 없음'}
              </div>
            </CTableDataCell>
            {/* 위험 점수 */}
            <CTableDataCell>
              <div className="fw-semibold">
                {item.score?.score == null
                  ? '없음'
                  : `${item.score.score}% ${dangerLevel(item.score.score)}`}
              </div>
              <CProgress
                thin
                color={getProgressColor(item.score?.score ?? 0)}
                value={item.score?.score ?? 0}
              />
              <div className="small text-body-secondary text-nowrap">
                업데이트: {item.score?.updateTime ?? '정보 없음'}
              </div>
            </CTableDataCell>
            {/* 일일 리포트 클릭 */}
            <CTableDataCell>
              <CButton
                className="text-nowrap"
                color="primary"
                onClick={() => handleNavigate('daily', item.id)}
              >
                일일 리포트
              </CButton>
            </CTableDataCell>
            {/* 기간 리포트 클릭 */}
            <CTableDataCell>
              <CButton
                className="text-nowrap"
                color="primary"
                onClick={() => navigateToReport('period', item.id)}
              >
                기간 리포트
              </CButton>
            </CTableDataCell>
            {/* 감정 분석 결과 */}
            <CTableDataCell>
              <div className="d-flex flex-column">
                {item ? (
                  <>
                    <div className="d-flex flex-row flex-wrap">
                      <CBadge color="primary" textColor="white" className="me-1 mb-1">
                        {item.emotion.highestEmotion}
                      </CBadge>
                      {item.emotion.secondEmotion && (
                        <CBadge color="info" textColor="white" className="me-1 mb-1">
                          {item.emotion.secondEmotion}
                        </CBadge>
                      )}
                      {item.emotion.thirdEmotion && (
                        <CBadge color="warning" textColor="white" className="me-1 mb-1">
                          {item.emotion.thirdEmotion}
                        </CBadge>
                      )}
                    </div>
                    <div className="small text-body-secondary text-nowrap">
                      업데이트: {item.emotion.dateString ?? '정보 없음'}
                    </div>
                  </>
                ) : (
                  '정보 없음'
                )}
              </div>
            </CTableDataCell>

            {/* 상담 시작 날짜 */}
            <CTableDataCell>
              <div className="text-nowrap">{item.firstTime}</div>
            </CTableDataCell>
          </CTableRow>
        ))}
      </UserTable>
    </>
  );
};

export default CustomersContainer;

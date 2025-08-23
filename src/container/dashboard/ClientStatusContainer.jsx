// containers/ClientStatusContainer.jsx
import React from 'react';
import Title from '../../views/base/title/Title';
import UserTable from '../../components/table/UserTable';
import { CButton, CProgress, CTableRow, CTableDataCell } from '@coreui/react';
import { dangerLevel, getProgressColor, navigateToReport } from '../../utils/tableUtils';

const ClientStatusContainer = ({ userTable }) => {
  const headers = ['내담자', '위험 점수', '일일 리포트', '기간 리포트'];
  return (
    <>
      <Title title="내담자 상태" subtitle="전체 내담자의 상태를 한 눈에 확인할 수 있습니다." />
      <UserTable headers={headers}>
        {userTable.map((item) => (
          <CTableRow key={item.id}>
            <CTableDataCell>
              <div>
                <span>{item.nickname}</span>
                <span className="small text-body-secondary text-nowrap"> #{item.id}</span>
              </div>
              <div className="small text-body-secondary text-nowrap">
                마지막 대화: {item.lastTime ?? '정보 없음'}
              </div>
            </CTableDataCell>

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

            <CTableDataCell>
              <CButton
                className="text-nowrap"
                color="primary"
                onClick={() => navigateToReport('daily', item.id)}
              >
                일일 리포트
              </CButton>
            </CTableDataCell>

            <CTableDataCell>
              <CButton
                className="text-nowrap"
                color="primary"
                onClick={() => navigateToReport('period', item.id)}
              >
                기간 리포트
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </UserTable>
    </>
  );
};

export default ClientStatusContainer;

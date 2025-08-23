//첫 페이지 대시보드
import { useEffect, useState, useMemo } from 'react';
import { CSpinner, CAlert } from '@coreui/react';
import { manageUsers } from '../apis/customers';
import RiskContainer from '../container/dashboard/RiskContainer';
import ClientStatusContainer from '../container/dashboard/ClientStatusContainer';

const Dashboard = () => {
  const [userTable, setUserTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const metrics = useMemo(() => {
    console.log('userTable metrics', userTable);

    // 평균 계산을 위한 'scores' 배열은 이전과 동일 (실제 점수가 있는 것만 대상)
    const scores = userTable.map((u) => u.score?.score).filter((n) => n != null);
    const average = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    // --- 여기부터 분류 로직 변경 ---
    // 모든 분류 기준을 원본 데이터인 'userTable'로 변경하여 일관성 유지

    const veryRiskClients = userTable.filter((u) => {
      const score = u.score?.score;
      return score != null && score >= 85;
    }).length;

    const riskClients = userTable.filter((u) => {
      const score = u.score?.score;
      return score != null && score >= 60 && score < 85;
    }).length;

    // [수정됨] '일반 내담자'는 점수가 60 미만이거나, 점수 자체가 null 또는 0인 경우를 포함
    const safeClients = userTable.filter((u) => {
      const score = u.score?.score;
      return score == null || score < 60; // score가 null이거나 60 미만인 경우
    }).length;

    // [수정됨] 새로운 규칙에 따라 '기록 없음'은 이제 없으므로 0으로 처리
    const noRecordClients = 0;

    // 전체 내담자 수는 userTable의 길이 (변경 없음)
    const totalClients = userTable.length;

    // 각 분류의 합이 totalClients와 일치하는지 확인하는 디버깅용 로그
    console.log('Total verification:', {
      total: totalClients,
      sum: veryRiskClients + riskClients + safeClients,
    });

    return {
      average,
      totalClients,
      veryRiskClients,
      riskClients,
      safeClients,
      noRecordClients,
      scores,
    };
  }, [userTable]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await manageUsers();
        console.log('Fetched user data:', data);

        // 정렬 로직 단순화
        const sortedData = data.sort((a, b) => {
          const scoreA = a.score?.score ?? -Infinity;
          const scoreB = b.score?.score ?? -Infinity;
          return scoreB - scoreA;
        });
        console.log('Sorted user data:', sortedData);

        setUserTable(sortedData);
      } catch (err) {
        console.error('사용자 데이터 로드 실패:', err);
        setError('데이터를 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-5">
        <CSpinner color="primary" />
        <p className="mt-2">데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <CAlert color="danger" dismissible onClose={() => setError(null)}>
        {error}
      </CAlert>
    );
  }

  return (
    <>
      {/* 위험 점수 컨테이너 */}
      <RiskContainer metrics={metrics} />

      {/* 환자 전체 상태 컨테이너 */}
      <ClientStatusContainer userTable={userTable} />
    </>
  );
};

export default Dashboard;

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
    const scores = userTable.map((u) => u.score?.score).filter((n) => n != null);
    const average = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    return { scores, average };
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
      <RiskContainer averageScore={metrics.average} userScores={metrics.scores} />

      {/* 환자 전체 상태 컨테이너 */}
      <ClientStatusContainer userTable={userTable} />
    </>
  );
};

export default Dashboard;

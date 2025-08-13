//dangerLevel : 위험 점수 값에 따라 위험 수준을 문자열로 반환
export const dangerLevel = (value) => {
    if (value === null || value === undefined) {
        return '정보 없음';
    }
    if (value <= 60) {
        return '안전';
    }
    else if (value <= 85) {
        return '위험';
    }
    else {
        return '매우 위험';
    }
}

//getProgressColor : 위험 점수 값에 따라 진행 바 색상을 반환
export const getProgressColor = (value) => {
    if (value === null || value === undefined) {
        return 'secondary';
    }
    if (value <= 60) {
        return 'success';
    }
    else if (value <= 85) {
        return 'warning';
    }
    else {
        return 'danger';
    }
}

//navigateToReport : 리포트 페이지로 이동하는 함수
export const navigateToReport = (type, id) => {
  if (!type || !id) {
    console.error('리포트 이동에 필요한 type 또는 id가 누락되었습니다.');
    return;
  }
  const url = `/#/customers/${type}-report/${id}`;
  window.location.href = url;
};
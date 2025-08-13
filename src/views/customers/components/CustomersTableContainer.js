import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import UserTable from '../../../components/table/UserTable'
import UserTableRow from '../../../components/table/UserTableRow'
import { navigateToReport as navigateToReportUtil } from '../../../utils/tableUtils';

/**
 * 전체 내담자 테이블 컨테이너
 * - 데이터 가공/핸들러 바인딩만 담당하고, 행 UI는 UserTableRow에 위임
 * @param {Object} props
 * @param {Array<Object>} props.data - 내담자 리스트
 * @param {Function} [props.onNavigate] - (type, id) => void. 미제공 시 utils의 navigateToReport 사용
 */
const CustomersTableContainer = ({ data, onNavigate }) => {
  const headers = useMemo(
    () => ['내담자', '위험 점수', '일일 리포트', '기간 리포트', '감정 분석', '상담 시작 날짜'],
    []
  )

  const items = useMemo(() => (Array.isArray(data) ? data : []), [data])

  const handleNavigate = useCallback(
    (type, id) => {
      if (typeof onNavigate === 'function') {
        onNavigate(type, id)
      } else {
        // fallback to util
        navigateToReportUtil(type, id)
      }
    },
    [onNavigate]
  )

  const renderRow = useCallback(
    (item) => <UserTableRow key={item.id} item={item} onNavigate={handleNavigate} />,
    [handleNavigate]
  )

  return <UserTable headers={headers} items={items} renderRow={renderRow} />
}

CustomersTableContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onNavigate: PropTypes.func,
}

export default CustomersTableContainer

import React, { useEffect, useCallback } from 'react'
import Title from '../base/title/Title'
import CustomersTableContainer from './components/CustomersTableContainer'
import { manageUsers } from '../../apis/customers'

// 내담자 전체 페이지
const Customers = () => {
  const [userTable, setUserTable] = React.useState([])
  useEffect(() => {
    manageUsers()
      .then((data) => {
        const userData = data.sort((a, b) => {
          if (a.score === null && b.score === null) {
            return 0 // 둘 다 score가 null인 경우 원래 순서 유지
          }
          if (a.score === null) {
            return 1 // a의 score가 null이면 b보다 뒤로
          }
          if (b.score === null) {
            return -1 // b의 score가 null이면 a보다 뒤로
          }
          return b.score.score - a.score.score // score 값이 있는 경우 큰 값이 먼저 오도록 정렬
        })
        setUserTable(userData)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const navigateToReport = (type, id) => {
    const url = `/#/customers/${type}-report/${id}`
    window.location.href = url
  }

  const handleNavigate = useCallback((type, id) => navigateToReport(type, id), [])

  return (
    <>
    <Title title="전체 내담자 정보" subtitle="전체 내담자의 정보를 한 눈에 확인할 수 있습니다" />
      {/*<CTable align="middle" className="mb-0 border" hover responsive>
        <CustomersTable data={userTable} />
      </CTable>*/}
      <CustomersTableContainer data={userTable} onNavigate={handleNavigate} />
    </>
  )
}

export default Customers

import React, { useEffect, useState, useMemo } from 'react'
import { CRow, CCol, CSpinner, CAlert } from '@coreui/react'
import Title from '../base/title/Title'
import HalfPanel from '../half-panel/half-panel'
import CardDropdown from '../base/cards/CardDropdown'
import Danger from '../danger/danger'
import { manageUsers } from '../../apis/customers'
import RiskIndexSection from './RiskIndexSection';
import ParticipantStatusSection from './ParticipantStatusSection';

const Dashboard = () => {
  const [userTable, setUserTable] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // userScores를 useMemo로 계산
  const userScores = useMemo(() => {
    return userTable.map(user => user.score?.score ?? null)
  }, [userTable])

  // 평균 점수 계산
  const averageScore = useMemo(() => {
    const validScores = userScores.filter(score => score !== null)
    if (validScores.length === 0) return 0
    
    const sum = validScores.reduce((acc, score) => acc + score, 0)
    return sum / validScores.length
  }, [userScores])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const data = await manageUsers()
        
        // 정렬 로직 단순화
        const sortedData = data.sort((a, b) => {
          const scoreA = a.score?.score ?? -Infinity
          const scoreB = b.score?.score ?? -Infinity
          return scoreB - scoreA
        })
        
        setUserTable(sortedData)
      } catch (err) {
        console.error('사용자 데이터 로드 실패:', err)
        setError('데이터를 불러오는 중 문제가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="text-center p-5">
        <CSpinner color="primary" />
        <p className="mt-2">데이터를 불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <CAlert color="danger" dismissible onClose={() => setError(null)}>
        {error}
      </CAlert>
    )
  }

  return (
    <>
      <RiskIndexSection averageScore={averageScore} userScores={userScores} />

      <br />
      
      <ParticipantStatusSection userTable={userTable} />
    </>
  )
}

export default Dashboard
//전체 내담자 상태 테이블
import React, { useState, useEffect } from 'react'
import { CRow, CCol, CSpinner, CAlert } from '@coreui/react'
import Title from '../base/title/Title'
import HalfPanel from '../half-panel/half-panel'
import CardDropdown from '../base/cards/CardDropdown'
import { manageUsers } from '../../apis/customers'
import DashboardUserTableContainer from './component/DashboardUserTableContainer'
const ParticipantStatusSection = ({ userTable }) => {
  return (
    <>
      <Title
        title="내담자 상태 파악하기"
        subtitle="위험한 내담자의 상황을 한 눈에 볼 수 있습니다."
      />

      <DashboardUserTableContainer userTable={userTable} />
    </>
  )
}

export default ParticipantStatusSection

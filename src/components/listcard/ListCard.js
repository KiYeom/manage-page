import { CCard, CCardHeader, CListGroup } from '@coreui/react'
import React from 'react'
import Title from '../../views/base/title/Title'

const ListCard = ({ title, subtitle, children }) => {
  return (
    <CCard>
      <CCardHeader>
        <Title title={title} subtitle={subtitle} />
      </CCardHeader>
      <CListGroup flush>{children}</CListGroup>
    </CCard>
  )
}
export default ListCard

import React from 'react'
import styled from '@emotion/styled'
const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 300px;
`
const Title = styled.span`
  font-size: 20px;
  color: red;
`
const Desc = styled.span`
  font-size: 10px;
  color: blue;
`
const KeywordChip = () => {
  return (
    <Container>
      <div>
        <Title>제목입니당</Title>
        <Desc>설명입니당</Desc>
      </div>
    </Container>
  )
}
export default KeywordChip

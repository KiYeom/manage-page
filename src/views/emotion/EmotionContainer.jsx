import React from 'react'
import styled from '@emotion/styled'
import palette from '../../assets/styles/theme'

const EmotionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 30px 10px;
  background-color: ${palette.web[400]};
  border-radius: 10px;
`

export default EmotionContainer

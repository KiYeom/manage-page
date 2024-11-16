import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import Icon from '../../components/icon/icons'
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100px;
  height: 100px;
  border-radius: 10px;
`
const Text = styled.span`
  font-size: 20px;
  color: rebeccapurple;
`

const EmotionChip = ({ text, group }) => {
  return (
    <Container>
      <Icon name={group} />
      <Text>{text}</Text>
    </Container>
  )
}
export default EmotionChip

EmotionChip.propTypes = {
  text: PropTypes.string,
  group: PropTypes.string,
}

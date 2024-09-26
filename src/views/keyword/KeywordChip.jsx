import React from 'react'
import styled from '@emotion/styled'
import Icon from '../../components/icon/icons'
import PropTypes from 'prop-types'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 300px;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
`
const Title = styled.span`
  font-size: 30px;
  color: red;
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const Circle = styled.div((props) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  backgroundColor: props.bg,
}))

const KeywordChip = ({ color, text }) => {
  return (
    <Container>
      {color && (
        <Circle bg={color.bg}>
          <Icon name="clover" fill={color.object} width={60} height={60} />
        </Circle>
      )}
      <TextContainer>
        <Title>{text}</Title>
      </TextContainer>
    </Container>
  )
}
export default KeywordChip

KeywordChip.propTypes = {
  color: PropTypes.object,
  text: PropTypes.string,
}

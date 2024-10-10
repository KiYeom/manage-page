import React from 'react'
import styled from '@emotion/styled'
import propTypes from 'prop-types'

const CTAButton = ({ url, label }) => {
  const handleClick = () => {
    window.open(url, '_blank')
  }

  return (
    <ButtonContainer>
      <StyledButton onClick={handleClick}>{label}</StyledButton>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.8), transparent);
`

const StyledButton = styled.button`
  width: 100%;
  max-width: 350px;
  height: 60px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ae8;
  }
`

CTAButton.propTypes = {
  url: propTypes.string,
  label: propTypes.string,
}

CTAButton.defaultProps = {
  url: 'https://remind4u.co.kr/tob-form?from=1011',
  label: '무료 도입 신청(15초)',
}

export default CTAButton

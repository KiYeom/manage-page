import React from 'react'
import styled from '@emotion/styled'
import propTypes from 'prop-types'
import FullPie from './full-pie'

const FullPanel = ({ mainText, subText, score, width, height }) => {
  const PanelContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: ${width};
    height: ${height};
    justify-content: space-between;
    border-radius: 20px;
    padding: 20px;
    margin: 20px 0px 20px 0px;
    justify-content: center;
    align-items: center;
    background-color: #222630;
  `

  return (
    <PanelContainer>
      <PanelText>
        <SubText>{subText}</SubText>
        <MainText>
          {score}
          {mainText}
        </MainText>
      </PanelText>
      <PanelGraph>
        <FullPie />
      </PanelGraph>
    </PanelContainer>
  )
}

const PanelText = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`

const MainText = styled.span`
  font-size: 40px;
  color: #ffffff;
  text-align: center;
  margin: 0;
  padding: 0;
`

const SubText = styled.span`
  font-size: 28px;
  color: #ffffff;
  text-align: center;
  margin: 0;
  padding: 0;
`

const PanelGraph = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  width: 50%;
`

FullPanel.propTypes = {
  mainText: propTypes.string,
  subText: propTypes.string,
  score: propTypes.number,
  width: propTypes.string,
  height: propTypes.string,
}

export default FullPanel

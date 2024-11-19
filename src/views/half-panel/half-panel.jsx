import React from 'react'
import HalfPie from './half-pie'
import styled from '@emotion/styled'
import propTypes from 'prop-types'

const HalfPanel = ({ mainText, subText, detailText, width, height, score, showPie }) => {
  const PanelContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: ${width};
    height: ${height};
    justify-content: space-between;
    border-radius: 20px;
    padding: 20px;
    margin: 10px 0px 10px 0px;
    justify-content: center;
    align-items: center;
    background-color: #222630;
  `

  return (
    <PanelContainer width={width} height={height}>
      <PanelText>
        <SubText>{subText}</SubText>
        <MainText>
          {Math.floor(score)}
          {mainText}
        </MainText>
        <DetailText>{detailText}</DetailText>
      </PanelText>
      <PanelGraph>{showPie && <HalfPie score={score} />}</PanelGraph>
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
  font-size: 60px;
  color: #ffffff;
  text-align: center;
  margin: 0;
  padding: 0;
`

const SubText = styled.span`
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  margin: 0;
  padding: 0;
`

const DetailText = styled.span`
  font-size: 16px;
  color: #cbcbcb;
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

HalfPanel.propTypes = {
  mainText: propTypes.string,
  subText: propTypes.string,
  detailText: propTypes.string,
  score: propTypes.number,
  width: propTypes.string,
  height: propTypes.string,
  showPie: propTypes.bool,
}

export default HalfPanel

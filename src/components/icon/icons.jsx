import React from 'react'
import PropTypes from 'prop-types'
import Happy from '../../assets/svg/happy.svg'
import Sad from '../../assets/svg/sad.svg'
import Angry from '../../assets/svg/angry.svg'
import Calm from '../../assets/svg/calm.svg'
import Clover from '../../assets/svg/clover.svg'
import Search from '../../assets/svg/search.svg'

const Icon = ({ name, width, height, fill }) => {
  {
    switch (name) {
      case 'happy':
        return <Happy width={width} height={height} fill={fill} />
      case 'sad':
        return <Sad width={width} height={height} fill={fill} />
      case 'angry':
        return <Angry width={width} height={height} fill={fill} />
      case 'calm':
        return <Calm width={width} height={height} fill={fill} />
      case 'clover':
        return <Clover width={width} height={height} fill={fill} />
      case 'search':
        return <Search width={width} height={height} fill={fill} />
    }
  }
}
export default Icon

Icon.propTypes = {
  name: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
}

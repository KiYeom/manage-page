import React from 'react'
import PropTypes from 'prop-types'
import Happy from '../../assets/svg/happy.svg'
import Sad from '../../assets/svg/sad.svg'
import Angry from '../../assets/svg/angry.svg'
import Calm from '../../assets/svg/calm.svg'

const Icon = ({ name, width, height, color }) => {
  {
    switch (name) {
      case 'happy':
        return <Happy width={width} height={height} color={color} />
      case 'sad':
        return <Sad width={width} height={height} color={color} />
      case 'angry':
        return <Angry width={width} height={height} color={color} />
      case 'calm':
        return <Calm width={width} height={height} color={color} />
    }
  }
}
export default Icon

Icon.propTypes = {
  name: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MuteToggleButton, VolumeSlider } from 'react-player-controls'

export default class Sound extends Component {
  render() {
    return (
      <div>
        <MuteToggleButton
          isEnabled={true}
          isMuted={this.props.isMuted}
          onMuteChange={this.props.onMuteChange}
        />

        <VolumeSlider
          isEnabled={true}
          volume={this.props.volume}
          onVolumeChange={this.props.onVolumeChange}
        />
      </div>
    )
  }
}

Sound.propTypes = {
  isMuted: PropTypes.bool.isRequired,
  onMuteChange: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PlayButton extends Component {
  render() {
    const handleChange = (e) => {
      this.props.togglePlay()
    }

    const button = this.props.isPlaying ? <div className="fa fa-pause fa-2x"></div> : <div className="fa fa-play fa-2x"></div>
    return (
      <div className="play-button" onClick={handleChange}>
        {button}
      </div>
    )
  }
}

PlayButton.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
}

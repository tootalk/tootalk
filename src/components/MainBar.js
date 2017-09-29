import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TL, TLNAME } from '../const.js'
import Selector from '../components/Selector'
import PlayButton from '../components/PlayButton'
import SettingButton from '../components/SettingButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Slider } from 'material-ui'

export default class MainBar extends Component {
  render() {
    return (
      <div className="main-bar">
        <PlayButton
          isPlaying={this.props.isPlaying}
          togglePlay={this.props.togglePlay}
        />
        <div className="volume-slider">
          <MuiThemeProvider>
            <Slider
              value={this.props.volume}
              onChange={this.props.changeVolume}
            />
          </MuiThemeProvider>
        </div>

      </div>
    )
  }
}

MainBar.propTypes = {

  isPlaying: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,

  volume : PropTypes.number.isRequired,
  changeVolume : PropTypes.func.isRequired,

}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'
import { togglePlay, changeVolume } from '../actions'
import MainBar from '../components/MainBar'
import Options from '../components/Options'
import Streaming from '../lib/streaming'
import Speech from '../lib/speech/speech'

let streaming;
let speech;
let prevState;
let allowPlay = false

function reset() {
  if (speech) {
    speech.cancel();
  } else {
    speech = new Speech();
  }
  if (!streaming) {
    streaming = new Streaming();
  }

  streaming.start(speech);
}

ipcRenderer.on( 'unreadName', (e, bool) => {
  streaming.setNameSpeak("")
})

ipcRenderer.on( 'readName', (e, bool) => {
  streaming.setNameSpeak("name")
})

ipcRenderer.on( 'readID', (e, bool) => {
  streaming.setNameSpeak("id")
})

ipcRenderer.on( 'selectLocal', (e) => {
  streaming.setTL('public:local');
  if ( allowPlay ) {
    reset();
  }
})

ipcRenderer.on( 'selectGlobal', (e) => {
  streaming.setTL('public');
  if ( allowPlay ) {
    reset();
  }
})

ipcRenderer.on( 'selectHome', (e) => {
  streaming.setTL('user');
  if ( allowPlay ) {
    reset();
  }
})

class App extends React.Component {
  componentWillMount() {}

  render() {
    const { isPlaying, togglePlay, volume, changeVolume } = this.props
    return (
      <div>
        <MainBar
          isPlaying={isPlaying}
          togglePlay={togglePlay}

          volume={volume}
          changeVolume={changeVolume}
        />
      </div>
    )
  }
}

App.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
}

// reactコンポーネントへの値の受け渡し
const mapStateToProps = (state) => {
  if (prevState) {

    // 再生/停止ボタンが押された
    if (prevState.togglePlay.isPlaying !== state.togglePlay.isPlaying) {
      allowPlay = state.togglePlay.isPlaying
      if (!state.togglePlay.isPlaying) {
        streaming.closeConnection();
        speech.cancel();
      } else {
        reset(state.settingSpeech.tl);
      }
    }

    // 読み上げる速さの変更
    if (prevState.settingOptions.maxRate !== state.settingOptions.maxRate) {
      if (speech) {
        speech.setMaxRate(state.settingOptions.maxRate);
      }
    }

    // 読み上げる音量の変更
    if (prevState.changeVolume.volume !== state.changeVolume.volume) {
      speech.setVolume(state.changeVolume.volume);
    }
  } else {
    speech = new Speech();
    streaming = new Streaming();
  }

  prevState = state;
  return {
    isPlaying: state.togglePlay.isPlaying,
    volume: state.changeVolume.volume,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlay: () => dispatch(togglePlay()),
    changeVolume: (event, volume) => dispatch(changeVolume(event, volume)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

import { combineReducers } from 'redux'
//import changeMute from './changeMute.js'
//import changeVolume from './changeVolume.js'
import settingSpeech from './settingSpeech.js'
import togglePlay from './togglePlay.js'
import toggleSettingOpen from './toggleSettingOpen.js'
import settingOptions from './settingOptions.js'
import changeVolume from './changeVolume.js'

const tooTalk = combineReducers({
  settingSpeech,
  togglePlay,
  toggleSettingOpen,
  settingOptions,
  changeVolume,
})

export default tooTalk

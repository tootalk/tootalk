//export const changeMute = () => ({
//  type: 'CHANGE_MUTE',
//})
//
//export const changeVolume = (volume) => ({
//  type: 'CHANGE_VOLUME',
//  volume
//}

export const selectTL = (tl) => ({
  type: 'SELECT_TL',
  tl
})

export const togglePlay = () => ({
  type: 'TOGGLE_PLAY',
})

export const toggleSettingOpen = () => ({
  type: 'TOGGLE_SETTING_OPEN',
})

export const toggleNameSpeak = () => ({
  type: 'TOGGLE_NAME_SPEAK',
})

export const changeMaxRate = (maxRate) => ({
  type: 'CHANGE_MAX_RATE',
  maxRate
})

export const changeVolume = (event, volume) => ({
  type: 'CHANGE_VOLUME',
  volume
})

const initialState = {
  allowNameSpeak: false,
  maxRate: 2.0,
}

const settingOptions = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_NAME_SPEAK':
      //return Object.assign(state, { allowNameSpeak: !state.allowNameSpeak })
      return { allowNameSpeak: !state.allowNameSpeak, maxRate: state.maxRate }
    case 'CHANGE_MAX_RATE':
      //return Object.assign(state, { maxRate: Number(action.maxRate) })
      return { allowNameSpeak: state.allowNameSpeak, maxRate: Number(action.maxRate) }
    default:
      return state
  }
}

export default settingOptions

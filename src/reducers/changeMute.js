const initialState = {
  isMuted: true
}

const changeMute = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_MUTE':
      return { isMuted: !state.isMuted}
    default:
      return state
  }
}

export default changeMute

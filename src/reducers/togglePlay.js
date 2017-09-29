const initialState = {
  isPlaying: false
}

const togglePlay = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_PLAY':
      return { isPlaying: !state.isPlaying}
    default:
      return state
  }
}

export default togglePlay

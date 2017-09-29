const initialState = {
  volume: 1.0
}

const changeVolume = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VOLUME':
      return { volume: action.volume }
    default:
      return state
  }
}

export default changeVolume

const initialState = {
  tl: 'public:local',
}

const settingSpeech = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_TL':
      return { tl: action.tl}
    default:
      return state
  }
}

export default settingSpeech

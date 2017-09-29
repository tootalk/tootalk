const initialState = {
  isOpened: false
}

const toggleSettingOpen = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SETTING_OPEN':
      return { isOpened: !state.isOpened}
    default:
      return state
  }
}

export default toggleSettingOpen

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import tooTalk from './.tmp/reducers/index.js'
import App from './.tmp/containers/App.js'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = createStore(tooTalk);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

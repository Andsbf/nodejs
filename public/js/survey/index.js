import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import surveyApp from './reducers'

const store = createStore(surveyApp)
debugger;
const rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)

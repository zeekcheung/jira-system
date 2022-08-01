import 'antd/dist/antd.less'
import AppProvider from 'context'
import { DevTools, loadServer } from 'jira-dev-tool'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from 'store'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './whyr'

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <AppProvider>
          <DevTools />
          <Router>
            <App />
          </Router>
        </AppProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

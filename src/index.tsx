import 'antd/dist/antd.less'
import { DevTools, loadServer } from 'jira-dev-tool'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import AppProvider from './context'
import reportWebVitals from './reportWebVitals'
import './whyr'

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProvider>
        <DevTools />
        <Router>
          <App />
        </Router>
      </AppProvider>
    </React.StrictMode>,
    document.getElementById('root')
  )
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

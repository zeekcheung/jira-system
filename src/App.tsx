import React from 'react'
import ErrorBoundary from './components/error-boundary'
import { AuthenticatedApp } from 'pages/authenticated-app'
import { UnauthenticatedApp } from 'pages/unauthenticated-app'
import { FullPageError } from 'components/lib'
import { useAuth } from 'context/auth-context'
import './App.css'

function App() {
  const { user } = useAuth()
  return (
    /*
      user初始值为null，登录/注册后设为User对象
      登录或注册后显示验证后的页面，否则显示未验证的页面
    */
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  )
}

export default App

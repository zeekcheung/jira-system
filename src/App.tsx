import React from "react";
import AuthenticatedApp from "pages/authenticated-app";
import UnauthenticatedApp from "pages/unauthenticated-app";
import "./App.css";
import { useAuth } from "context/auth-context";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {
        /* 
          user初始值为null，登录/注册后设为User对象
          登录或注册后显示验证后的页面，否则显示未验证的页面
        */
        user ? <AuthenticatedApp /> : <UnauthenticatedApp />
      }
    </div>
  );
}

export default App;

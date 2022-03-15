import React, { useState } from "react";
import Login from "./login";
import Register from "./register";

export default function UnauthenticatedApp() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      {isRegister ? <Register /> : <Login />}
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "已有帐号？去登录" : "没有账号？去注册"}
      </button>
    </div>
  );
}

import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";

export default function Login() {
  const { user, login } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // 阻止表单默认提交
    event.preventDefault();
    // 发起登录请求
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };

  return (
    <div>
      <div>{user ? `登录成功，用户名为${user.name}` : null}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">用户名</label>
          <input type="text" id="username" autoComplete="true" />
        </div>
        <div>
          <label htmlFor="password">密码</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  );
}

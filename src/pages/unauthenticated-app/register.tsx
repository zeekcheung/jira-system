import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";

export default function Login() {
  const { register } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // 阻止表单默认提交
    event.preventDefault();
    // 发起注册请求
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  );
}

import { User } from "pages/authenticated-app/project-list/search-panel";

const baseURL = process.env.REACT_APP_API_URL;

// 登录注册数据
export interface Data {
  username: string;
  password: string;
}

// localStorage中存储token的键
const tokenKey = "__auth_provider_token__";

// 获取token值
export const getToken = () => window.localStorage.getItem(tokenKey);

// 设置token值
export const setToken = (user: User) =>
  window.localStorage.setItem(tokenKey, user.token || "");

// 封装登录功能
export const login = async (data: Data) => {
  const response = await fetch(`${baseURL}/login`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const _data = await response.json();
  if (response.ok) {
    // 如果登录成功，则设置token值，并返回value为user的成功Promise，以便修改全局状态user
    const { user } = _data;
    setToken(user);
    return user;
  } else {
    // 如果登录失败，则返回失败的Promise
    return Promise.reject(_data);
  }
};

// 封装注册功能
export const register = async (data: Data) => {
  const response = await fetch(`${baseURL}/register`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const _data = await response.json();
  if (response.ok) {
    // 如果注册成功，则设置token值，并返回value为user的成功Promise，以便修改全局状态user
    const { user } = _data;
    setToken(user);
    return user;
  } else {
    // 如果登录失败，则返回失败的Promise
    return Promise.reject(_data);
  }
};

// 封装登出功能
export const logout = async () => window.localStorage.removeItem(tokenKey);

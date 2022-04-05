/* 
  封装 http 请求 
*/
import { useAuth } from "context/auth-context";
import qs from "qs";
import * as auth from "../auth-provider";

const baseURL = process.env.REACT_APP_API_URL;

// fetch请求的配置对象
interface Config extends RequestInit {
  data?: object;
  token?: string;
}

// 封装http()用于发起请求，并携带token
export const http = async (
  endpoint: string,
  { data, headers, token, ...customConfig }: Config = {}
) => {
  // 设置请求配置对象
  const config = {
    // 默认配置
    method: "GET",
    headers: {
      "Content-type": data ? "application/json" : "",
      Authorization: token ? `Bearer ${token}` : "",
    },
    // 自定义配置
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  const response = await fetch(`${baseURL}/${endpoint}`, config);
  const _data = await response.json();

  // 如果用户未登录
  if (response.status === 401) {
    await auth.logout();
    window.location.reload();
    return Promise.reject({ message: "请重新登录" });
  }

  return response.ok ? _data : Promise.reject(_data);
};

// 封装useHttp()用于二次封装http请求，自动携带token
export const useHttp = () => {
  const { user } = useAuth();
  // 返回一个经过封装的http函数
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

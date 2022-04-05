/* 
  统一管理异步操作的状态
 */

import { useState } from "react";

interface State<D> {
  text: "pending" | "loading" | "success" | "error";
  data: D | null;
  error: Error | null;
}

export const useAsync = <D>(
  initialState: State<D> = { text: "pending", data: null, error: null }
) => {
  const [state, setState] = useState<State<D>>(initialState);

  // 请求成功，设置data
  const setData = (data: D) => {
    setState({
      text: "success",
      data,
      error: null,
    });
  };

  // 请求失败，设置error
  const setError = (error: Error) => {
    setState({
      text: "error",
      data: null,
      error,
    });
  };

  // 执行异步操作，修改状态
  const run = (promise: Promise<D>) => {
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isIdle: state.text === "pending",
    isLoading: state.text === "loading",
    isSuccess: state.text === "success",
    isError: state.text === "error",
    setData,
    setError,
    run,
    ...state,
  };
};

import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * 获取页面url中指定键的参数值
 * @param keys 参数键数组
 * @returns [param, setParam]
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParam, setSearchParam] = useSearchParams();
  return [
    // 通过 useMemo 解决依赖循环问题：searchParam 改变时计算 keys.reduce，而不是重新渲染组件
    // 基本类型、组件状态可以放在依赖数组中；非组件状态的对象不能放在依赖数组中，否则会引起循环渲染
    //（每次重新渲染都会产生一个新的对象，和原对象不同，导致又会重新渲染）
    useMemo(
      () =>
        keys.reduce((prevParam, key) => {
          return { ...prevParam, key: searchParam.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParam, keys]
    ),
    setSearchParam,
  ] as const; // 将数组指定为元组，解决类型提示问题
};

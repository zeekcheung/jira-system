import { useEffect, useState } from "react";

/**
 * 判断输入值是否为假值
 */
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

/**
 * 清除对象中属性值为假值的属性
 */
// 参数类型限定为狭义的对象类型，避免类型错误
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

/**
 * 封装ComponentDidMount钩子
 * @param {Function} callback 组件挂载后执行的回调函数
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line
  }, []);
};

/**
 * 封装防抖函数
 */
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

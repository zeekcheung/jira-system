import { useEffect, useState } from "react";

/**
 * 判断输入值是否为假值
 */
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

/**
 * 清除对象中属性值为假值的属性
 */
export const cleanObject: (object: object) => object = (object) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    // @ts-ignore
    const value = object[key];
    if (isFalsy(value)) {
      // @ts-ignore
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

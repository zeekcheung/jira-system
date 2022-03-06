import { useEffect, useState } from "react";

/**
 * 判断输入值是否为假值
 * @param {*} value
 * @returns boolean
 */
export const isFalsy = (value) => (value === 0 ? false : !value);

/**
 * 清除对象中属性值为假值的属性
 * @param {Object} object
 * @returns {Array} Array
 */
export const cleanObject = (object) => {
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
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

/**
 * 封装防抖函数
 * @param {*} value 防抖处理的值
 * @param {Number} delay 回调延迟时长
 */
export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearInterval(timeout);
  }, [value, delay]);

  return debounceValue;
};

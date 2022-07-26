import { useEffect, useRef, useState } from 'react'

/**
 * 判断输入值是否为假值
 */
export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === ''
/**
 * 清除对象中属性值为假值的属性
 */
// 参数类型限定为狭义的对象类型，避免类型错误
export const cleanObject = (object: { [key: string]: unknown } = {}) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

/**
 * 封装ComponentDidMount钩子
 * @param {Function} callback 组件挂载后执行的回调函数
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line
  }, [])
}

/**
 * 封装防抖函数
 */
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounceValue
}

/**
 * 重置路由，将页面url重置为原始url
 */
export const resetRoute = () => (window.location.href = window.location.origin)

/**
 * 组件挂载时修改页面title，组件卸载时还原页面title
 * @param title 页面 title
 * @param keepOnUnmount 组件卸载时是否保留当前title
 */
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current // 旧的title

  // 组件挂载时修改页面的title
  useEffect(() => {
    document.title = title
    // 组件卸载时还原页面的title
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [title, keepOnUnmount, oldTitle])
}

/**
 * 获取组件挂载状态，组件已挂载返回 true，组件已卸载返回 false
 * @returns MutableRefObject<boolean>
 */
export const useMountRef = () => {
  const mountRef = useRef(false)

  useEffect(() => {
    // 组件已挂载
    mountRef.current = true
    // 组件已卸载
    return () => {
      mountRef.current = false
    }
  }, [])

  return mountRef
}

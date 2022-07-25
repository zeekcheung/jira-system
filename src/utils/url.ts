import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from 'utils'

/**
 * 获取页面url中指定键的参数值
 * @param keys 参数键数组
 * @returns [param, setParam]
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParam, setSearchParam] = useSearchParams()
  return [
    useMemo(
      () =>
        keys.reduce((prevParam, key) => {
          return { ...prevParam, [key]: searchParam.get(key) || '' }
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line
      [searchParam]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParam),
        ...params,
      }) as URLSearchParamsInit
      return setSearchParam(o)
    },
  ] as const // 将数组指定为元组，解决类型提示问题
}

/*
  统一管理异步操作的状态
 */

import { useCallback, useState } from 'react'
import { useMountRef } from 'utils'

interface State<D> {
  text: 'pending' | 'loading' | 'success' | 'error'
  data: D | null
  error: Error | null
}

export const useAsync = <D>(
  initialState: State<D> = { text: 'pending', data: null, error: null }
) => {
  const [state, setState] = useState<State<D>>(initialState)
  const [retry, setRetry] = useState(() => () => {})

  // 请求成功，设置data
  const setData = useCallback((data: D) => {
    setState({
      text: 'success',
      data,
      error: null,
    })
  }, [])

  // 请求失败，设置error
  const setError = (error: Error) => {
    setState({
      text: 'error',
      data: null,
      error,
    })
  }

  const mountRef = useMountRef()

  // 执行异步操作，修改状态
  const run = useCallback(
    (promise: Promise<D>, config?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入 Promise 类型数据')
      }

      setRetry(() => () => {
        if (config?.retry) {
          run(config?.retry(), config)
        }
      })

      return promise
        .then((data) => {
          mountRef.current && setData(data)
          return data
        })
        .catch((error) => {
          setError(error)
          return error
        })
    },
    [mountRef, setData]
  )

  return {
    isIdle: state.text === 'pending',
    isLoading: state.text === 'loading',
    isSuccess: state.text === 'success',
    isError: state.text === 'error',
    setData,
    setError,
    run,
    retry,
    ...state,
  }
}

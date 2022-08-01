import * as auth from 'auth-provider'
import { FullPageError, FullPageLoading } from 'components/lib'
import { User } from 'pages/authenticated-app/project-list/search-panel'
import { ReactNode, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store'
import {
  bootstrapThunk,
  loginThunk,
  logout as logoutAction,
  registerThunk,
  selectUser,
} from 'store/slices/auth-slice'
import { useMount } from 'utils'
import { useAsync } from 'utils/async'

/* 2.封装AuthContext.provider组件，提供全局数据：user、login、register、logout */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 用户状态user为全局状态
  const { error, isIdle, isLoading, isError, run } = useAsync<User | null>()

  const dispatch: (...args: unknown[]) => Promise<User | null> =
    useAppDispatch()

  // 组件挂载时初始化user
  useMount(() => {
    run(dispatch(bootstrapThunk()))
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageError error={error} />
  }

  return <div>{children}</div>
}

export const useAuth = () => {
  const dispatch = useAppDispatch()

  const user = useSelector(selectUser)
  const login = useCallback(
    (data: auth.Data) => dispatch(loginThunk(data)),
    [dispatch]
  )
  const register = useCallback(
    (data: auth.Data) => dispatch(registerThunk(data)),
    [dispatch]
  )
  const logout = useCallback(() => dispatch(logoutAction()), [dispatch])

  return { user, login, register, logout }
}

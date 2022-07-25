import React, { useContext, ReactNode } from 'react'
import * as auth from 'auth-provider'
import { User } from 'pages/authenticated-app/project-list/search-panel'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/async'
import { FullPageError, FullPageLoading } from 'components/lib'

/* 1.创建context，管理全局数据：user、login、register、logout */
const AuthContext = React.createContext<
  | {
      user: User | null
      login: (auth: auth.Data) => Promise<void>
      register: (auth: auth.Data) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

// 初始化user
const bootstrapUser = async () => {
  let user = null
  // 从localStorage中获取token
  const token = auth.getToken()
  if (token) {
    // 如果存在token，则请求用户信息，获取user字段
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

/* 2.封装AuthContext.provider组件，提供全局数据：user、login、register、logout */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 用户状态user为全局状态
  const {
    data: user,
    setData: setUser,
    error,
    isIdle,
    isLoading,
    isError,
    run,
  } = useAsync<User | null>()

  // 再次封装login、register、logout函数，登录、注册、登出后修改user状态
  const login = (data: auth.Data) => auth.login(data).then(setUser)
  const register = (data: auth.Data) => auth.register(data).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  // 组件挂载时初始化user
  useMount(() => {
    run(bootstrapUser())
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageError error={error} />
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}

/* 3.封装useAuth()供函数组件使用AuthContext */
export const useAuth = () => {
  // 获取AuthProvider提供的value
  const value = useContext(AuthContext)
  if (value === undefined) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return value
}

import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from 'pages/authenticated-app/project-list/search-panel'
import {
  Data,
  getToken,
  login as authLogin,
  register as authRegister,
} from './../../auth-provider'
import { RootState } from './../index'
// TODO: 使用 redux-toolkit 管理登录状态
import { createSlice } from '@reduxjs/toolkit'
import { http } from 'utils/http'

interface State {
  user: User | null
}

const initialState: State = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(bootstrapThunk.fulfilled, (state, action) => {
        state.user = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export const authReducer = authSlice.reducer

export const selectUser = (state: RootState) => state.auth.user

// 异步 action
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data: Data, thunkApi) => {
    return await authLogin(data)
  }
)

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (data: Data, thunkApi) => {
    return await authRegister(data)
  }
)

export const bootstrapThunk = createAsyncThunk('auth/bootstrap', async () => {
  let user = null
  const token = getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
})

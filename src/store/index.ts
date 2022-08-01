import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth-slice'
import { projectReducer } from './slices/project-slice'

export const store = configureStore({
  reducer: {
    project: projectReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

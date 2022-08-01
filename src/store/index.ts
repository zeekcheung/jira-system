import { configureStore } from '@reduxjs/toolkit'
import { projectReducer } from './slices/project-slice'

export const store = configureStore({
  reducer: {
    project: projectReducer,
    // auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

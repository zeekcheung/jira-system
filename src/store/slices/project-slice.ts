import { useDispatch } from 'react-redux'
import { RootState } from './../index'
import { createSlice } from '@reduxjs/toolkit'
import { useCallback } from 'react'

interface State {
  modalVisible: boolean
}

const initialState: State = {
  modalVisible: false,
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    openProjectModal(state) {
      state.modalVisible = true
    },
    closeProjectModal(state) {
      state.modalVisible = false
    },
  },
})

export const { openProjectModal, closeProjectModal } = projectSlice.actions
export const projectReducer = projectSlice.reducer

export const selectModalVisible = (state: RootState) =>
  state.project.modalVisible

export const useHandleModal = () => {
  const dispatch = useDispatch()
  const handleOpenModal = useCallback(
    () => dispatch(openProjectModal()),
    [dispatch]
  )
  const handleCloseModal = useCallback(
    () => dispatch(closeProjectModal()),
    [dispatch]
  )

  return { handleOpenModal, handleCloseModal }
}

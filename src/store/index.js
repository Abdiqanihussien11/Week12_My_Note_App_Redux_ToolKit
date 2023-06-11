import { configureStore } from '@reduxjs/toolkit'
import NoteRducer from './api/NoteSlice'

export const store = configureStore({
  reducer: {
    note : NoteRducer
  },
})
import { configureStore } from '@reduxjs/toolkit';
import noteReducer from './api/noteSlice';

export const store = configureStore({
    reducer: {
        note: noteReducer
    },
});

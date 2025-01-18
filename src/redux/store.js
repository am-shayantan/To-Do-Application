import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todoSlice';
import editModalReducer from './features/editModalSlice';

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        editModal: editModalReducer
    },
})
import { createSlice } from "@reduxjs/toolkit";

const editModalSlice = createSlice({
    name: 'editModalSlice',
    initialState: {
        value: {
            id: null,
            title: null,
            description: null
        }
    },
    reducers: {
        openEditModal: (state, action) => {
            const { id, title, description } = action.payload;

            if(id && title){
                state.value = { id, title, description };
            }
        },
        closeEditModal: (state) => {
            state.value.id = null;
            state.value.title = null;
            state.value.description = null;
        }
    }
});

export const { openEditModal, closeEditModal } = editModalSlice.actions;

export default editModalSlice.reducer
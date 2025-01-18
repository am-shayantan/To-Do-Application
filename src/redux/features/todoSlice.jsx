import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        value: JSON.parse(localStorage.getItem('todos') || null) || []
        /**
         * {
         *  id: new Date().getTime(),
         *  title: string,
         *  description: string,
         *  pending: Boolean
         * }
         */
    },
    reducers: {
        addTodo: (state, action) => {
            if(action.payload.title){
                state.value.push({
                    id: new Date().getTime(),
                    title: action.payload.title,
                    description: action.payload.description || '',
                    pending: true
                })
            }
        },
        deleteTodo: (state, action) => {
            if(action.payload.id){

                if(state.value.length == 1) {
                    state.value = [];
                    return;
                }

                const result = state.value.filter(each => each.id !== action.payload.id);

                state.value = result;
            }
        },
        togglePending: (state, action) => {
            if(action.payload.id){
                const index = state.value.findIndex(each => each.id === action.payload.id);
                if(index !== -1){
                    state.value[index].pending = !state.value[index].pending;
                }
            }
        },
        editTodo: (state, action) => {
            if(action.payload.id){
                const index = state.value.findIndex(each => each.id === action.payload.id);
                if(index !== -1){
                    const { title, description } = action.payload;
                    if(title){
                        state.value[index].title = title;
                    }
                    if(description){
                        state.value[index].description = description;
                    }
                }
            }
        }
    }
});

export const { addTodo, deleteTodo, editTodo, togglePending } = todoSlice.actions;

export default todoSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

let todoId = 0;

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo(state, action) {
            state.push({
                id: todoId++,
                text: action.payload,
                completed: false,
            })
        },
        deleteTodo(state, action) {
            return state.filter(todo => todo.id !== action.payload);  
        },
        toggleTodo(state, action) {
            const todo = state.find(t => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        }
    }
})


export const todoActions = todoSlice.actions;

export default todoSlice.reducer;
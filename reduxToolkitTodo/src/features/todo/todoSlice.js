import {createSlice , nanoid} from '@reduxjs/toolkit'

const initialState = {
    todos: [{
        id: 1,
        title: 'Hello World',
    }]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state , action) => {
            const newTodo = {
                id: nanoid(),
                title: action.payload.title
            }
            state.todos.push(newTodo)
        },

        removeTodo: (state , action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
        },

        updateTodo: (state , action) => {
            const {id , title} = action.payload
            const existingTodo = state.todos.find((todo) => todo.id === id)
            if(existingTodo) {
                existingTodo.title = title
            }

        }
    }
})

export const {addTodo , removeTodo , updateTodo} = todoSlice.actions

export default todoSlice.reducer
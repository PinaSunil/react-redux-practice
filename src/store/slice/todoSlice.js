// slice

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("fetchTodos", async() => {
  const apiResponse = await fetch('https://jsonplaceholder.typicode.com/todos')
  const result = await apiResponse.json()
  return result
})

const initialState = {
  todoList: [],
  loading : false,
  todosFromApi : [],
  isError : false
};

const todoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action) {
      console.log(action);
      const newlyCreatedTodo = {
        id: self.crypto.randomUUID(),
        title: action.payload,
      };
      state.todoList.push(newlyCreatedTodo);
      return state;
    },
    deleteTodo(state, action) {
      state.todoList = state.todoList.filter(
        (todoItem) => todoItem.id !== action.payload
      );
      return state;
    },

    editTodo(state, action) {
      let getTodos = state.todoList;

      const getCurrentTodoIndex = getTodos.findIndex(
        (item) => item.id === action.payload.currentEditedTodoId
      );

      getTodos[getCurrentTodoIndex] = {
        ...getTodos[getCurrentTodoIndex],
        title: action.payload.currentTodo,
      };
      state.todoList = getTodos;

      return state;
    },
  },

  extraReducers : (builder) => {
    builder.addCase(fetchTodos.pending,(state,action) => {
        state.loading = true
    })
    
    builder.addCase(fetchTodos.fulfilled, (state,action) => {
      state.loading = false
      state.todosFromApi = action.payload
    })

    builder.addCase(fetchTodos.rejected, (state, action) => {
       state.loading = false
       state.isError = true
    })
  }
});

export const { addTodo, deleteTodo, editTodo } = todoReducer.actions;

export default todoReducer.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './todosAPI';

// Async thunks
export const getTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetchTodos();
    return response;
  }
);

export const addTodo = createAsyncThunk(
  'todos/createTodo',
  async (todoData) => {
    const response = await createTodo(todoData);
    // Generate a unique ID since JSONPlaceholder always returns id: 201
    return {
      ...response,
      id: Date.now() // Use timestamp as unique ID
    };
  }
);

export const editTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, todoData }) => {
    // If ID is greater than 200, it's a new todo we created locally
    // JSONPlaceholder only has IDs 1-200, so we skip the API call
    if (id > 200) {
      return { ...todoData, id };
    }
    const response = await updateTodo(id, todoData);
    return { ...response, id };
  }
);

export const removeTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    // Only call API for existing todos (ID <= 200)
    if (id <= 200) {
      await deleteTodo(id);
    }
    return id;
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(getTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add todo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Edit todo
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Remove todo
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(todo => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchTodo = createAsyncThunk('fetchtodo', async () => {
    const responce = await fetch('https://jsonplaceholder.typicode.com/todos')
    return responce.json();
});

export const markAsCompleted = createAsyncThunk('markAsCompleted', async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: true }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return id;
    } catch (error) {
        console.error("Error in markAsCompleted:", error);
        return rejectWithValue(error.message);
    }
});

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodo.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(fetchTodo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });

        builder.addCase(fetchTodo.rejected, (state, action) => {
            console.log(action.payload);
            state.isError = true;
        });
        builder.addCase(markAsCompleted.fulfilled, (state, action) => {
            console.log("Mark as Completed fulfilled for task ID:", action.payload);
            const task = state.data.find((task) => task.id === action.payload);
            if (task) {
                task.completed = true;
                console.log("Task updated:", task);
            }
        });

        builder.addCase(markAsCompleted.rejected, (state, action) => {
            console.error("Mark as Completed rejected for task ID:", action.meta.arg, action.payload);
        });
    }
})

export default todoSlice.reducer;


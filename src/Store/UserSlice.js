import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; 
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(userCredentials) => {
        const request = await axios.post('https://dummyjson.com/auth/login', userCredentials);
        const response  = await request.data;
        localStorage.setItem('user', JSON.stringify(response));
        return response;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
            console.log(localStorage.getItem('user'));
        });
        builder.addCase(loginUser.rejected, (state, action) => { // Corregir esta línea
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if (action.error.message === 'Request failed with status code 400') {
                state.error = 'Access Denied!  Invalid Credentials';
            } else {
                state.error = action.error.message;
            }
        });
    }
});


export default userSlice.reducer;
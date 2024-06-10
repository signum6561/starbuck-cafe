import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8000/api/auth';

export const login = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, data);
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/register`, data);
      return res.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  const token = Cookies.get('userToken');
  await axios
    .post(
      `${BASE_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .catch((err) => console.err(err));
});

export const getUserData = createAsyncThunk('auth/getUserData', async () => {
  const token = Cookies.get('userToken');
  const res = await axios
    .get(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
  return res.data;
});

const initialState = {
  status: 'idle',
  token: Cookies.get('userToken') ?? '',
  user: null,
  failed: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'success';
        const token = action.payload.token;
        Cookies.set('userToken', token, { path: '', secure: true });
        state.token = token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.failed = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'success';
        Cookies.remove('userToken');
        state.token = '';
      })
      .addCase(logout.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'success';
        const token = action.payload.token;
        Cookies.set('userToken', token, { path: '', secure: true });
        state.token = token;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.failed = action.payload;
      })
      .addCase(getUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(getUserData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default authSlice.reducer;

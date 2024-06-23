import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '@services/axiosClient';
import jwtService from '@services/jwtService';
import { toast } from 'react-toastify';

const BASE_PREFIX = '/auth';

const initialState = {
  status: 'idle',
  user: null,
  errors: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { email, password, remember } = credentials;
      const res = await axiosInstance.post(
        `${BASE_PREFIX}/login`,
        {
          email,
          password,
        },
        {
          noRefresh: true,
        },
      );
      if (remember) {
        jwtService.rememberLogin();
      }
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
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`${BASE_PREFIX}/register`, payload, {
        noRefresh: true,
      });
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
  await axiosInstance
    .post(`${BASE_PREFIX}/logout`)
    .catch((err) => console.err(err));
});

export const getUserData = createAsyncThunk('auth/getUserData', async () => {
  const res = await axiosInstance
    .get(`${BASE_PREFIX}/user`)
    .then((res) => res.data);
  return res.data;
});

export const refresh = createAsyncThunk('auth/refresh', async () => {
  const refreshToken = jwtService.getRefreshToken();
  const res = await axiosInstance.post(
    `${BASE_PREFIX}/refresh`,
    {
      refresh_token: refreshToken,
    },
    {
      noRefresh: true,
    },
  );
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'success';
        const accessToken = payload.access_token;
        const refreshToken = payload.refresh_token;
        jwtService.setTokens(accessToken, refreshToken);
        jwtService.setTimeExp(payload.expires_in);
        state.errors = null;
        window.location.reload();
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.errors = payload?.errors;
        toast.error('Failed to login!', {
          toastId: 'login',
        });
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'success';
        jwtService.deleteTokens();
        window.location.reload();
        toast.success('Logout successfully!', {
          toastId: 'logout',
        });
      })
      .addCase(logout.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'success';
        state.errors = null;
        toast.success('Create account successfully!', {
          toastId: 'register',
        });
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.errors = payload?.errors;
        toast.error('Failed to create account!', {
          toastId: 'register',
        });
      })
      .addCase(getUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.user = payload;
      })
      .addCase(getUserData.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(refresh.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.status = 'success';
        const accessToken = payload.access_token;
        const refreshToken = payload.refresh_token;
        jwtService.setTokens(accessToken, refreshToken);
        jwtService.setTimeExp(payload.expires_in);
      })
      .addCase(refresh.rejected, (state) => {
        state.status = 'failed';
        jwtService.deleteTokens();
        window.location.reload();
      });
  },
});

export default authSlice.reducer;

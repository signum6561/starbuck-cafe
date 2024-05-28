import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  page: 1,
  data: [],
};

export const fetchCustomers = createAsyncThunk(
  'customer/fetchCustomers',
  async () => {
    const res = await fetch(`http://localhost:8000/api/v1/customers?page=1`);
    const resJson = await res.json();
    return resJson.data;
  },
);

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = [...action.payload];
      })
      .addCase(fetchCustomers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default customerSlice.reducer;

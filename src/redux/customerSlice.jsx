import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  currentPage: 0,
  rowsPerPage: 5,
  total: 0,
  pageCount: 0,
  data: [],
  selected: [],
};

export const fetchCustomers = createAsyncThunk(
  'customer/fetchCustomers',
  async (page) => {
    const res = await axios.get(
      `http://localhost:8000/api/v1/customers?page=${page}`,
    );
    return res.data;
  },
);

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = [...action.payload];
    },
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
    changeRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'success';
        const payload = action.payload;
        state.data = payload.data;
        state.total = payload.meta.total;
        state.pageCount = payload.meta.last_page;
      })
      .addCase(fetchCustomers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSelected, changePage, changeRowsPerPage } =
  customerSlice.actions;

export default customerSlice.reducer;

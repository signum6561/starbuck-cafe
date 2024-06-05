import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle',
  currentPage: 1,
  rowsPerPage: 10,
  total: 0,
  pageCount: 0,
  data: [],
  selected: [],
  sort: {
    column: '',
    order: 'asc',
  },
  filters: {
    start: 0,
    data: [],
  },
};

const BASE_URL = 'http://localhost:8000/api/v1/customers';

export const fetchCustomers = createAsyncThunk(
  'customer/fetchCustomers',
  async (_, thunkAPI) => {
    const { currentPage, rowsPerPage, filters, sort } =
      thunkAPI.getState().customer;
    const filtersStr = filters.data
      .filter((filter) => Boolean(filter.value))
      .map(
        (filter) =>
          `filters[${filter.column}][$${filter.operator}]=${filter.value}`,
      )
      .join('&');
    const sortStr = sort.column ? `sort=${sort.column}%3A${sort.order}` : '';
    const token = localStorage.getItem('userToken');
    const res = await axios.get(
      `${BASE_URL}?page=${currentPage}&perPage=${rowsPerPage}&${filtersStr}&${sortStr}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  },
);

export const fetchCustomerById = createAsyncThunk(
  'customer/fetchCustomerById',
  async (id) => {
    const token = localStorage.getItem('userToken');
    const res = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
);

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (customer) => {
    const token = localStorage.getItem('userToken');
    await axios.post(`${BASE_URL}`, customer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
);

export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async (customer) => {
    const token = localStorage.getItem('userToken');
    await axios.put(`${BASE_URL}/${customer.id}`, customer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
);

export const deleteCustomer = createAsyncThunk(
  'customer/deleteCustomer',
  async (id, thunkAPI) => {
    const token = localStorage.getItem('userToken');
    await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    thunkAPI.dispatch(fetchCustomers());
    return id;
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
      state.currentPage = 1;
    },
    addFilter: (state, action) => {
      const filter = action.payload;
      state.filters.start++;
      const { start, data } = state.filters;
      const index = data.findIndex((val) => val.id === filter.id);
      if (index !== -1) {
        state.filters.data[index] = filter;
      } else {
        state.filters.data = [...data, { ...filter, id: start }];
      }
    },
    removeFilter: (state, action) => {
      const id = action.payload;
      const { data } = state.filters;
      state.filters.data = data.filter((filter) => filter.id !== id);
    },
    clearFilter: (state) => {
      state.filters.data = [];
    },
    changeSort: (state, action) => {
      state.sort = action.payload;
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
        if (state.currentPage >= state.pageCount && state.currentPage > 1) {
          state.currentPage = state.pageCount;
        }
      })
      .addCase(fetchCustomers.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchCustomerById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = [action.payload.data];
      })
      .addCase(fetchCustomerById.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCustomer.fulfilled, (state) => {
        state.status = 'success';
        state.customer = null;
      })
      .addCase(updateCustomer.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCustomer.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(createCustomer.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCustomer.fulfilled, (state) => {
        state.status = 'success';
        state.customer = null;
      })
      .addCase(deleteCustomer.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  setSelected,
  changePage,
  changeRowsPerPage,
  addFilter,
  removeFilter,
  clearFilter,
  changeSort,
} = customerSlice.actions;

export default customerSlice.reducer;

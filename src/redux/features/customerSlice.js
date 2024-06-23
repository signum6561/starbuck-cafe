import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '@services/axiosClient';
import { queryBuilder } from '@services/queryBuilder';
import { toast } from 'react-toastify';

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
  columns: [
    {
      id: 'id',
      label: 'ID',
      operators: ['eq', 'contains', 'startsWith', 'endsWith'],
    },
    {
      id: 'fullname',
      label: 'Fullname',
      operators: ['eq', 'contains', 'startsWith', 'endsWith'],
      sortable: true,
    },
    {
      id: 'email',
      label: 'Email',
      operators: ['eq', 'contains', 'startsWith', 'endsWith'],
      sortable: true,
    },
    {
      id: 'address',
      label: 'Address',
      operators: ['eq', 'contains', 'startsWith', 'endsWith'],
    },
    {
      id: 'birthday',
      label: 'Birthday',
      operators: ['eq', 'lte', 'lt', 'gt', 'gte', 'contains'],
      sortable: true,
    },
    {
      id: 'starPoints',
      label: 'Star Points',
      operators: ['eq', 'lte', 'lt', 'gt', 'gte'],
      type: 'number',
      sortable: true,
    },
    {
      id: 'type',
      label: 'Type',
      operators: ['eq', 'contains'],
    },
  ],
};

const BASE_PREFIX = '/v1/customers';

export const fetchCustomers = createAsyncThunk(
  'customer/fetchCustomers',
  async (_, thunkAPI) => {
    const { currentPage, rowsPerPage, filters, sort } =
      thunkAPI.getState().customer;
    const queries = new queryBuilder()
      .paginate(currentPage, rowsPerPage)
      .filter(filters.data)
      .sort(sort)
      .build();

    const res = await axiosInstance.get(`${BASE_PREFIX}?${queries}`);
    return res.data;
  },
);

export const fetchCustomerById = createAsyncThunk(
  'customer/fetchCustomerById',
  async ({ id, includeInvoices = false }) => {
    const res = await axiosInstance
      .get(
        `${BASE_PREFIX}/${id}${includeInvoices ? '?includeInvoices=true' : ''}`,
      )
      .then((res) => res.data);
    return res.data;
  },
);

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (payload) => {
    await axiosInstance.post(`${BASE_PREFIX}`, payload);
  },
);

export const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async (payload) => {
    await axiosInstance.put(`${BASE_PREFIX}/${payload.id}`, payload);
  },
);

export const deleteCustomer = createAsyncThunk(
  'customer/deleteCustomer',
  async ({ id, refetchCustomers = false }, thunkAPI) => {
    await axiosInstance.delete(`${BASE_PREFIX}/${id}`);
    if (refetchCustomers) {
      await thunkAPI.dispatch(fetchCustomers()).unwrap();
    }
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
    addFilter: (state, { payload }) => {
      state.filters.start++;
      const { start, data } = state.filters;
      const idx = data.findIndex((val) => val.id === payload.id);
      if (idx !== -1) {
        state.filters.data[idx] = payload;
      } else {
        state.filters.data = [...data, { ...payload, id: start }];
      }
    },
    removeFilter: (state, { payload }) => {
      const id = payload;
      const { data } = state.filters;
      state.filters.data = data.filter((filter) => filter.id !== id);
    },
    clearFilter: (state) => {
      state.filters.data = [];
    },
    changeSort: (state, action) => {
      state.sort = action.payload;
    },
    hideColumn: (state, { payload }) => {
      const { columnId, value } = payload;
      const { filters, sort } = state;
      const columns = state.columns;
      const idx = columns.findIndex((col) => col.id === columnId);
      if (idx !== -1) {
        state.columns[idx].hide = value;
      }
      state.filters.data = filters.data.filter(
        (val) => val.column !== columnId,
      );
      if (sort.column === columnId) {
        state.sort = {
          column: '',
          order: 'asc',
        };
      }
    },
    resetToDefault: (state) => {
      state.columns = state.columns.map((col) => {
        return { ...col, hide: false };
      });
      state.filters = {
        start: 0,
        data: [],
      };
      state.sort = {
        column: '',
        order: 'asc',
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.data = payload.data;
        state.total = payload.meta?.total;
        state.pageCount = payload.meta?.last_page;
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
      .addCase(fetchCustomerById.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.data = [payload];
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
        toast.success('Updated successfully', {
          toastId: 'updated',
        });
      })
      .addCase(updateCustomer.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCustomer.fulfilled, (state) => {
        state.status = 'success';
        toast.success('Created successfully', {
          toastId: 'created',
        });
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
  hideColumn,
  resetToDefault,
} = customerSlice.actions;

export default customerSlice.reducer;

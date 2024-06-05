import styles from './Customers.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFilter,
  changePage,
  changeRowsPerPage,
  changeSort,
  clearFilter,
  deleteCustomer,
  deleteMutipleCustomer,
  fetchCustomers,
  removeFilter,
  setSelected,
} from '@redux/features/customerSlice';
import { CustomerTable } from '@components/DataTable';
import { useEffect, useState } from 'react';
import CustomPagination from '@components/CustomPagination';
import { Button, Popover } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import FilterBuilder from '@components/FilterBuilder';
import SortBuilder from '@components/SortBuilder';

const cx = classNames.bind(styles);

const columns = [
  {
    id: 'id',
    label: 'ID',
    operators: ['eq'],
  },
  {
    id: 'fullname',
    label: 'Fullname',
    operators: ['contains', 'eq'],
    sortable: true,
  },
  {
    id: 'email',
    label: 'Email',
    operators: ['contains', 'eq'],
    sortable: true,
  },
  {
    id: 'address',
    label: 'Address',
    operators: ['contains', 'eq'],
  },
  {
    id: 'birthday',
    label: 'Birthday',
    operators: ['contains', 'eq'],
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
    operators: ['contains', 'eq'],
  },
];

export default function Customers() {
  const dispatch = useDispatch();
  const [selectMode, setSelectMode] = useState(false);
  const navigate = useNavigate();
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [anchorElSort, setAnchorElSort] = useState(null);
  const filterOpen = Boolean(anchorElFilter);
  const sortOpen = Boolean(anchorElSort);

  const {
    data,
    currentPage,
    rowsPerPage,
    pageCount,
    selected,
    status,
    filters,
    sort,
  } = useSelector((store) => store.customer);
  const isLoading = status === 'loading';

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [currentPage, dispatch, rowsPerPage]);

  const handleChangePage = (e, newPage) => {
    dispatch(setSelected([]));
    dispatch(changePage(newPage));
  };

  const handleChangePageSize = (e) => {
    dispatch(changeRowsPerPage(e.target.value));
  };

  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };

  const handleDeleteSelected = () => {
    dispatch(setSelected([]));
    dispatch(deleteMutipleCustomer(selected)).then(() => {
      dispatch(fetchCustomers());
    });
  };

  const switchMode = () => {
    dispatch(setSelected([]));
    setSelectMode(!selectMode);
  };

  const handleAddFilter = (filter) => {
    dispatch(addFilter(filter));
  };

  const handleRemoveFilter = (id) => {
    dispatch(removeFilter(id));
  };

  const handleChangeSort = (sort) => {
    dispatch(changeSort(sort));
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('actions-container')}>
        <div className={cx('select-section')}>
          <Button
            variant='outlined'
            onClick={() => switchMode()}
            color='secondary'
            disabled={isLoading}
          >
            {selectMode ? 'Cancel' : 'Select'}
          </Button>
          <Button
            endIcon={<Icon icon='mdi:filter' />}
            onClick={(e) => setAnchorElFilter(e.currentTarget)}
          >
            Filters
          </Button>
          <Button
            endIcon={<Icon icon='bx:sort-a-z' />}
            onClick={(e) => setAnchorElSort(e.currentTarget)}
          >
            Sort
          </Button>
        </div>
        {selectMode && (
          <Button
            variant='contained'
            color='red'
            endIcon={<Icon icon='fluent:subtract-circle-24-filled' />}
            onClick={() => handleDeleteSelected()}
            disabled={isLoading}
          >
            Delete
          </Button>
        )}
        <Button
          variant='contained'
          endIcon={<Icon icon='mdi:plus-circle' />}
          onClick={() => navigate('/customers/new')}
          disabled={isLoading}
        >
          New
        </Button>
        <Button
          variant='contained'
          endIcon={<Icon icon='tdesign:refresh' />}
          onClick={() => dispatch(fetchCustomers())}
          disabled={isLoading}
        >
          Refresh
        </Button>
      </div>
      <Popover
        open={sortOpen}
        anchorEl={anchorElSort}
        onClose={() => setAnchorElSort(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <SortBuilder
          onChange={handleChangeSort}
          value={sort}
          columns={columns}
        />
      </Popover>
      <Popover
        open={filterOpen}
        anchorEl={anchorElFilter}
        onClose={() => setAnchorElFilter(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <FilterBuilder
          config={columns}
          onAddFilter={handleAddFilter}
          onDeleteFilter={handleRemoveFilter}
          onClearFilter={() => dispatch(clearFilter())}
          value={filters.data}
        />
      </Popover>
      <CustomerTable
        data={data}
        loading={status === 'loading'}
        selected={selected}
        selectMode={selectMode}
        handleDelete={handleDelete}
        columns={columns}
      />
      <CustomPagination
        rowsAffected={selected.length}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20]}
        page={currentPage}
        count={pageCount}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangePageSize}
        disabled={isLoading}
      />
    </div>
  );
}

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
  fetchCustomers,
  hideColumn,
  removeFilter,
  resetToDefault,
  setSelected,
} from '@redux/features/customerSlice';
import { CustomerTable } from '@components/DataTable';
import { useCallback, useState } from 'react';
import CustomPagination from '@components/CustomPagination';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Popover,
  debounce,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import FilterBuilder from '@components/FilterBuilder';
import SortBuilder from '@components/SortBuilder';
import ManageColumn from '@components/ManageColumn';

const cx = classNames.bind(styles);

export default function Customers() {
  const dispatch = useDispatch();
  const [selectMode, setSelectMode] = useState(false);
  const navigate = useNavigate();
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [anchorElSort, setAnchorElSort] = useState(null);
  const [anchorElColumn, setAnchorElColumn] = useState(null);
  const [deleteManyDialog, setDeleteManyDialog] = useState(false);
  const filterOpen = Boolean(anchorElFilter);
  const sortOpen = Boolean(anchorElSort);
  const columnsOpen = Boolean(anchorElColumn);

  const {
    currentPage,
    rowsPerPage,
    pageCount,
    selected,
    status,
    filters,
    sort,
    columns,
  } = useSelector((store) => store.customer);
  const isLoading = status === 'loading';
  const validColumns = columns.filter((col) => !col.hide);

  const handleChangePage = (e, newPage) => {
    dispatch(setSelected([]));
    dispatch(changePage(newPage));
  };

  const handleChangePageSize = (e) => {
    dispatch(setSelected([]));
    dispatch(changeRowsPerPage(e.target.value));
  };

  const handleDeleteSelected = () => {
    switchMode();
    dispatch(
      deleteCustomer({ id: selected.join(','), refetchCustomers: true }),
    );
    dispatch(fetchCustomers());
    setDeleteManyDialog(false);
  };

  const switchMode = () => {
    dispatch(setSelected([]));
    setSelectMode(!selectMode);
  };

  const debounceFetch = useCallback(
    debounce(() => dispatch(fetchCustomers()), 1000),
    [],
  );

  const handleAddFilter = (filter) => {
    dispatch(addFilter(filter));
    if (filter.value) {
      debounceFetch();
    }
  };

  const handleRemoveFilter = (id) => {
    dispatch(removeFilter(id));
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
  };

  const handleChangeSort = (sort) => {
    dispatch(changeSort(sort));
  };

  const handleHideColumn = (e, colId) => {
    dispatch(hideColumn({ columnId: colId, value: !e.target.checked }));
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
          <Button
            onClick={(e) => setAnchorElColumn(e.currentTarget)}
            endIcon={<Icon icon='ic:round-view-column' />}
          >
            Columns
          </Button>
        </div>
        {selectMode && selected.length > 0 && (
          <Button
            variant='contained'
            color='red'
            endIcon={<Icon icon='fluent:subtract-circle-24-filled' />}
            onClick={() => setDeleteManyDialog(true)}
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
          onClick={() => dispatch(resetToDefault())}
          disabled={isLoading}
        >
          Reset
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
          columns={validColumns}
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
          config={validColumns}
          onAddFilter={handleAddFilter}
          onDeleteFilter={handleRemoveFilter}
          onClearFilter={handleClearFilter}
          value={filters.data}
        />
      </Popover>
      <Dialog
        open={deleteManyDialog}
        onClose={() => setDeleteManyDialog(false)}
      >
        <DialogTitle>{`Are you sure you want to delete all ${selected.length} selected rows?`}</DialogTitle>
        <DialogActions>
          <Button
            variant='contained'
            color='red'
            onClick={() => {
              handleDeleteSelected();
            }}
          >
            Delete
          </Button>
          <Button onClick={() => setDeleteManyDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Popover
        open={columnsOpen}
        anchorEl={anchorElColumn}
        onClose={() => setAnchorElColumn(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ManageColumn columns={columns} onHideColumn={handleHideColumn} />
      </Popover>
      <CustomerTable selectMode={selectMode} />
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

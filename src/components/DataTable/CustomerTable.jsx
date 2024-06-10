import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import styles from './DataTable.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCustomer,
  fetchCustomers,
  setSelected,
} from '@redux/features/customerSlice';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const TableRow = ({ obj, checked, onClick, selectMode, onOptionClick }) => {
  return (
    <tr onClick={selectMode ? () => onClick(obj.id) : null}>
      <td align='center'>
        {selectMode ? (
          <Checkbox checked={checked} />
        ) : (
          <IconButton onClick={(e) => onOptionClick(e, obj.id)}>
            <Icon icon='mdi:dots-vertical' />
          </IconButton>
        )}
      </td>
      <td align='center' className={cx('cell')}>
        <Link to={`/customers/${obj.id}/detail`}>{obj.id}</Link>
      </td>
      <td className={cx('cell')} hidden={!obj.fullname}>
        {obj.fullname}
      </td>
      <td className={cx('cell')} hidden={!obj.email}>
        {obj.email}
      </td>
      <td className={cx('cell')} hidden={!obj.address}>
        {obj.address}
      </td>
      <td align='center' className={cx('cell')} hidden={!obj.birthday}>
        {obj.birthday}
      </td>
      <td align='center' className={cx('cell')} hidden={!obj.starPoints}>
        <Icon icon='emojione:star' />
        {obj.starPoints}
      </td>
      <td
        align='center'
        className={cx(
          'cell',
          cx(obj.type === 'Gold' ? 'gold-type' : 'green-type'),
        )}
        hidden={!obj.type}
      >
        <b>{obj.type}</b>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  obj: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
  selectMode: PropTypes.bool,
  onOptionClick: PropTypes.func,
};

export function CustomerTable({ selectMode }) {
  const {
    data,
    currentPage,
    rowsPerPage,
    columns,
    status,
    selected,
    sort,
    filters,
  } = useSelector((store) => store.customer);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const open = Boolean(anchorEl);
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = status === 'loading';
  const filtersCount = filters.data.length;

  const isItemSelected = (item) => {
    return selected.includes(item);
  };

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [currentPage, dispatch, rowsPerPage, sort]);

  useEffect(() => {
    if (filtersCount === 0) {
      dispatch(fetchCustomers());
    }
  }, [dispatch, filtersCount]);

  const handleSelect = (item) => {
    if (!isItemSelected(item)) {
      dispatch(setSelected([...selected, item]));
    } else {
      dispatch(setSelected(selected.filter((val) => val !== item)));
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      dispatch(setSelected(newSelected));
      return;
    }
    dispatch(setSelected([]));
  };

  const handleCloseOption = () => setAnchorEl(null);
  const handleOpenOption = (e, id) => {
    setId(id);
    setAnchorEl(e.currentTarget);
  };

  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };

  const exceptColumns = columns.filter((col) => col.hide).map((col) => col.id);
  const customerList =
    exceptColumns.length > 0
      ? data.map((val) => {
          return Object.entries(val)
            .filter(([key]) => !exceptColumns.includes(key))
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
        })
      : data;

  return (
    <div className={cx('wrapper')}>
      <table>
        <thead>
          <tr>
            <th>
              {selectMode && (
                <Checkbox
                  onChange={handleSelectAll}
                  checked={selected.length === data.length}
                  indeterminate={
                    selected.length > 0 && selected.length < data.length
                  }
                  sx={{ color: 'var(--light)' }}
                  color='contrast'
                />
              )}
            </th>
            {columns
              .filter((col) => !col.hide)
              .map((col) => (
                <th className={cx('field')} key={col.id}>
                  {col.label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <div className={cx('loading')}>
              <CircularProgress thickness={5} />
            </div>
          )}
          {customerList.map((row) => {
            return (
              <TableRow
                key={row.id}
                obj={row}
                checked={isItemSelected(row.id)}
                onClick={handleSelect}
                selectMode={selectMode}
                onOptionClick={handleOpenOption}
              />
            );
          })}
        </tbody>
      </table>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseOption}>
        <MenuItem
          sx={{ width: '100px' }}
          onClick={() => navigate(`/customers/${id}/detail`)}
        >
          Detail
        </MenuItem>
        <MenuItem onClick={() => navigate(`/customers/${id}/edit`)}>
          Edit
        </MenuItem>
        <MenuItem
          sx={{ color: '#ff0000' }}
          onClick={() => setDeleteDialog(true)}
        >
          Delete
        </MenuItem>
      </Menu>
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>{`Are you sure you want to delete customer ${id}?`}</DialogTitle>
        <DialogActions>
          <Button
            variant='contained'
            color='red'
            onClick={() => {
              handleDelete(id);
              setDeleteDialog(false);
            }}
          >
            Delete
          </Button>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CustomerTable.propTypes = {
  selectMode: PropTypes.bool,
};

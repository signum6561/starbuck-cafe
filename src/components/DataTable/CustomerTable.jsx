import {
  Checkbox,
  CircularProgress,
  IconButton,
  Link,
  Menu,
  MenuItem,
} from '@mui/material';
import styles from './DataTable.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { setSelected } from '@redux/features/customerSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <Link href={`customers/${obj.id}/detail`} underline='hover'>
          {obj.id}
        </Link>
      </td>
      <td className={cx('cell')}>{obj.fullname}</td>
      <td className={cx('cell')}>{obj.email}</td>
      <td className={cx('cell')}>{obj.address}</td>
      <td align='center' className={cx('cell')}>
        {obj.birthday}
      </td>
      <td align='center' className={cx('cell')}>
        <Icon icon='emojione:star' />
        {obj.starPoints}
      </td>
      <td
        align='center'
        className={cx(
          'cell',
          cx(obj.type === 'Gold' ? 'gold-type' : 'green-type'),
        )}
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

export function CustomerTable({
  data,
  loading,
  selected,
  selectMode,
  handleDelete,
  columns,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [id, setId] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isItemSelected = (item) => {
    return selected.includes(item);
  };

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
            {columns.map((col) => (
              <th className={cx('field')} key={col.id}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading && (
            <div className={cx('loading')}>
              <CircularProgress thickness={5} />
            </div>
          )}
          {data.map((row) => {
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
          onClick={() => {
            handleDelete(id);
            handleCloseOption();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}

CustomerTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  selected: PropTypes.array,
  selectMode: PropTypes.bool,
  handleDelete: PropTypes.func,
  columns: PropTypes.arrayOf(PropTypes.object),
};

import {
  Checkbox,
  CircularProgress,
  LinearProgress,
  Link,
} from '@mui/material';
import styles from './DataTable.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '@redux/customerSlice';

const cx = classNames.bind(styles);

const columns = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'fullname',
    label: 'Fullname',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'address',
    label: 'Address',
  },
  {
    id: 'birthday',
    label: 'Birthday',
  },
  {
    id: 'starPoints',
    label: 'Star Points',
  },
  {
    id: 'type',
    label: 'Type',
  },
];

const TableRow = ({ obj, checked, onClick }) => {
  return (
    <tr onClick={() => onClick(obj.id)}>
      <td className={cx('select-checkbox', 'center')}>
        <Checkbox checked={checked} />
      </td>
      <td className={cx('cell', 'center')}>
        <Link underline='hover'>{obj.id}</Link>
      </td>
      <td className={cx('cell')}>{obj.fullname}</td>
      <td className={cx('cell')}>{obj.email}</td>
      <td className={cx('cell')}>{obj.address}</td>
      <td className={cx('cell')}>{obj.birthday}</td>
      <td className={cx('cell', 'left')}>
        <div className={cx('stars')}>
          <Icon icon='emojione:star' />
          {obj.starPoints}
        </div>
      </td>
      <td
        className={cx(
          'cell',
          'center',
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
};

export function CustomerTable({ data }) {
  const dispatch = useDispatch();
  const selected = useSelector((store) => store.customerReducer.selected);
  const status = useSelector((store) => store.customerReducer.status);

  const isItemSelected = (item) => selected.includes(item);

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

  return (
    <div className={cx('wrapper')}>
      <table>
        <thead>
          <tr>
            <th key='checkbox' className={cx('select-checkbox', 'center')}>
              <Checkbox
                onChange={handleSelectAll}
                checked={selected.length === data.length}
                indeterminate={
                  selected.length > 0 && selected.length < data.length
                }
                sx={{ color: 'var(--light)' }}
                color='contrast'
              />
            </th>
            {columns.map((col) => (
              <th className={cx('field')} key={col.id}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {status === 'loading' && (
            <tr className={cx('loading')}>
              <CircularProgress thickness={5} />
            </tr>
          )}
          {data.map((row) => {
            return (
              <TableRow
                key={row.id}
                obj={row}
                checked={isItemSelected(row.id)}
                onClick={handleSelect}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

CustomerTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

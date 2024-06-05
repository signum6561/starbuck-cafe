import styles from './Filter.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Icon } from '@iconify/react';

const cx = classNames.bind(styles);

const operatorLabel = {
  eq: 'is equals to',
  gt: 'greater than',
  gte: 'greater and equals',
  lt: 'little than',
  lte: 'little and equals',
  contains: 'contains',
  startsWith: 'starts with',
  endsWith: 'ends with',
};

export default function Filter({
  columns,
  onFilterChange,
  onRemoveFilter,
  value,
}) {
  const selectedCol = columns.find((e) => e.id === value.column);
  const filter = value ?? null;

  const handleChangeColumn = (e) => {
    const col = e.target.value;
    onFilterChange({
      ...filter,
      column: col.id,
      operator: col.operators[0],
      value: '',
    });
  };

  const handleChangeOperator = (e) => {
    onFilterChange({
      ...filter,
      operator: e.target.value,
      value: '',
    });
  };

  const handleChangeValue = (e) => {
    onFilterChange({
      ...filter,
      value: e.target.value,
    });
  };

  return (
    <div className={cx('wrapper')}>
      <IconButton onClick={() => onRemoveFilter(filter.id)} size='small'>
        <Icon icon='ic:round-close' />
      </IconButton>
      <FormControl className={cx('column')} component='div' variant='standard'>
        <Select
          label='Columns'
          onChange={handleChangeColumn}
          value={selectedCol}
        >
          {columns.map((col) => (
            <MenuItem key={col.id} value={col}>
              {col.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        className={cx('operator')}
        component='div'
        variant='standard'
      >
        <Select
          label='Operator'
          onChange={handleChangeOperator}
          value={filter.operator}
        >
          {selectedCol?.operators.map((op) => (
            <MenuItem key={op} value={op}>
              {operatorLabel[op]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={cx('value')}>
        <TextField
          variant='standard'
          onChange={handleChangeValue}
          value={filter.value}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
      </div>
    </div>
  );
}

Filter.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFilterChange: PropTypes.func,
  onRemoveFilter: PropTypes.func,
  value: PropTypes.object,
};

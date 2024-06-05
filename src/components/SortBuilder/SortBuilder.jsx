import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material';
import styles from './SortBuilder.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
export default function SortBuilder({ columns, onChange, value }) {
  const sortableCol = columns.filter((col) => col.sortable);

  return (
    <div className={cx('wrapper')}>
      <FormControl variant='standard' fullWidth>
        <InputLabel shrink>Sort by</InputLabel>
        <Select
          value={value.column}
          onChange={(e) =>
            onChange({
              column: e.target.value,
              order: 'asc',
            })
          }
        >
          <MenuItem value=''>Unsort</MenuItem>
          {sortableCol.map((col) => (
            <MenuItem key={col.id} value={col.id}>
              {col.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <RadioGroup
        row
        value={value.order}
        onChange={(e) =>
          onChange({
            column: value.column,
            order: e.target.value,
          })
        }
      >
        <FormControlLabel value='asc' control={<Radio />} label='ASC' />
        <FormControlLabel value='desc' control={<Radio />} label='DESC' />
      </RadioGroup>
    </div>
  );
}

SortBuilder.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  value: PropTypes.object,
};

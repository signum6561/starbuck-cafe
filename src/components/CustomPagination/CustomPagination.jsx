import styles from './CustomPagination.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { MenuItem, Pagination, Select } from '@mui/material';

const cx = classNames.bind(styles);
export default function CustomPagination({
  rowsAffected,
  rowsPerPage,
  rowsPerPageOptions,
  page,
  count,
  onPageChange,
  onRowsPerPageChange,
  disabled,
}) {
  return (
    <div className={cx('wrapper')}>
      <p className={cx('rowsAffected')}>
        {rowsAffected > 0 && rowsAffected + ' rows affected'}
      </p>
      <div className={cx('rowsPerPage')}>
        <p>Rows per page: </p>
        <Select
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
          variant='standard'
          disabled={disabled}
        >
          {rowsPerPageOptions.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Pagination
        count={count}
        showFirstButton
        showLastButton
        page={page}
        onChange={onPageChange}
        color='primary'
      />
    </div>
  );
}

CustomPagination.propTypes = {
  rowsAffected: PropTypes.number,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  page: PropTypes.number,
  count: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  disabled: PropTypes.bool,
};

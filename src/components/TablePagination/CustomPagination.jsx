import styles from './CustomPagination.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { TablePagination } from '@mui/material';

const cx = classNames.bind(styles);
export default function CustomTablePagination({
  rowsAffected,
  rowsPerPage,
  rowsPerPageOptions,
  page,
  count,
  onPageChange,
  onRowPerPageChange,
  disabled,
}) {
  return (
    <div className={cx('wrapper')}>
      <p className={cx('rowsAffected')}>
        {rowsAffected > 0 && rowsAffected + ' rows affected'}
      </p>
      <TablePagination
        sx={{ border: 'none' }}
        component='div'
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        page={page}
        count={count}
        onPageChange={onPageChange}
        onRowPerPageChange={onRowPerPageChange}
        disabled={disabled}
      />
    </div>
  );
}

CustomTablePagination.propTypes = {
  rowsAffected: PropTypes.number,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  page: PropTypes.number,
  count: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowPerPageChange: PropTypes.func,
  disabled: PropTypes.bool,
};

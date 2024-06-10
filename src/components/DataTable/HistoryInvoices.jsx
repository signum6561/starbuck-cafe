import { Pagination } from '@mui/material';
import styles from './DataTable.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';

const cx = classNames.bind(styles);
export function HistoryInvoices({ data }) {
  const rowsPerPage = 5;
  const pageCount = data?.length ? data.length / 5 : 0;
  const [page, setPage] = useState(1);

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  return (
    <>
      <div className={cx('wrapper')}>
        <table>
          <thead>
            <th>ID</th>
            <th>Store ID</th>
            <th>Billed Date</th>
            <th>Total Cost</th>
          </thead>
          <tbody>
            {data
              ?.slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((invoice) => (
                <tr key={invoice.id}>
                  <td className={cx('cell')} align='center'>
                    {invoice.id}
                  </td>
                  <td className={cx('cell')} align='center'>
                    {invoice.storeId}
                  </td>
                  <td className={cx('cell')} align='center'>
                    {invoice.billedDate}
                  </td>
                  <td className={cx('cell')} align='center'>
                    ${invoice.totalCost}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className={cx('pagination')}>
        <Pagination
          count={pageCount}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
        />
      </div>
    </>
  );
}

HistoryInvoices.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

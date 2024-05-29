import styles from './Customers.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, setSelected } from '@redux/customerSlice';
import { CustomerTable } from '@components/DataTable';
import { useEffect } from 'react';
import TablePagination from '@components/TablePagination';
import { changePage } from '@redux/customerSlice';

const cx = classNames.bind(styles);
export default function Customers() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.customerReducer.data);
  const currentPage = useSelector((store) => store.customerReducer.currentPage);
  const rowsPerPage = useSelector((store) => store.customerReducer.rowsPerPage);
  const totalCustomer = useSelector((store) => store.customerReducer.total);
  const selected = useSelector((store) => store.customerReducer.selected);

  useEffect(() => {
    dispatch(fetchCustomers(currentPage));
  }, [dispatch, currentPage]);

  const handleChangePage = (e, newPage) => {
    dispatch(setSelected([]));
    dispatch(changePage(newPage));
  };

  return (
    <div className={cx('wrapper')}>
      <CustomerTable data={data} />
      <TablePagination
        rowsAffected={selected.length}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20]}
        page={currentPage}
        count={totalCustomer}
        onPageChange={handleChangePage}
      />
    </div>
  );
}

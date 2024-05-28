import styles from './Customers.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { fetchCustomers } from '@redux/customerSlice';
import DataTable from '@components/DataTable';

const cx = classNames.bind(styles);

const fields = [
  {
    id: 'id',
    label: 'ID',
    align: 'center',
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
    align: 'center',
  },
  {
    id: 'starPoints',
    label: 'Star Points',
    align: 'center',
  },
  {
    id: 'type',
    label: 'Type',
    align: 'center',
  },
];

export default function Customers() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.customerReducer.data);

  return (
    <div className={cx('wrapper')}>
      <Button
        variant='contained'
        onClick={() => {
          dispatch(fetchCustomers());
        }}
      >
        Fetch
      </Button>
      <DataTable columns={fields} rows={data} />
    </div>
  );
}

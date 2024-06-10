import { Button, Divider, LinearProgress } from '@mui/material';
import styles from './CustomerEdit.module.scss';
import classNames from 'classnames/bind';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCustomerById,
  updateCustomer,
} from '@redux/features/customerSlice';
import { useEffect, useState } from 'react';
import CustomerForm from '@components/CustomerForm';

const cx = classNames.bind(styles);
export default function CustomerEdit() {
  const { id } = useParams();
  const { data, status } = useSelector((store) => store.customer);
  const [back, setBack] = useState(false);
  const isLoading = status === 'loading';
  const customer = data[0];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomerById({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (back && !isLoading) {
      navigate('/customers');
    }
  }, [back, isLoading, navigate]);

  const handleUpdateUser = (customer) => {
    dispatch(updateCustomer({ ...customer, id }));
    setBack(true);
  };

  return (
    <div className={cx('wrapper')}>
      {isLoading && <LinearProgress />}
      <div className={cx('content')}>
        <div className={cx('header')}>
          <div className={cx('actions-container')}>
            <Button
              variant='outlined'
              startIcon={<Icon icon='ic:round-arrow-back-ios' />}
              onClick={() => navigate(-1)}
              disabled={isLoading}
            >
              Back
            </Button>
            <Button
              variant='contained'
              onClick={() => navigate(`/customers/${id}/detail`)}
              disabled={isLoading}
            >
              Detail
            </Button>
          </div>
          <h2>Edit Customer</h2>
        </div>
        <Divider variant='middle' />
        <div className={cx('content')}>
          <div className={cx('form-container')}>
            <CustomerForm
              onSubmit={handleUpdateUser}
              editedCustomer={customer}
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { Button, Divider, LinearProgress } from '@mui/material';
import styles from './CustomerNew.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import CustomerForm from '@components/CustomerForm';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomer } from '@redux/features/customerSlice';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
export default function CustomerNew() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [back, setBack] = useState(false);
  const { status } = useSelector((store) => store.customer);
  const isLoading = status === 'loading';

  useEffect(() => {
    if (back && !isLoading) {
      navigate('/customers');
    }
  }, [back, isLoading, navigate]);

  const handleCreateCustomer = (customer) => {
    dispatch(createCustomer(customer));
    setBack(true);
  };

  return (
    <div className={cx('wrapper')}>
      {isLoading && <LinearProgress />}
      <div className={cx('content')}>
        <div className={cx('header')}>
          <div className={cx('back-btn')}>
            <Button
              variant='outlined'
              startIcon={<Icon icon='ic:round-arrow-back-ios' />}
              onClick={() => navigate(-1)}
              disabled={isLoading}
            >
              Back
            </Button>
          </div>
          <h2>Create New Customer</h2>
        </div>
        <Divider variant='middle' />
        <div className={cx('form-container')}>
          <CustomerForm onSubmit={handleCreateCustomer} loading={isLoading} />
        </div>
      </div>
    </div>
  );
}

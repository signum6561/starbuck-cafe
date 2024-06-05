import { useNavigate, useParams } from 'react-router-dom';
import styles from './CustomerDetail.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCustomer,
  fetchCustomerById,
  updateCustomer,
} from '@redux/features/customerSlice';
import { useEffect, useState } from 'react';
import { Button, Divider, Grid, LinearProgress } from '@mui/material';
import CustomerForm from '@components/CustomerForm';
import { Icon } from '@iconify/react';

const cx = classNames.bind(styles);
export default function CustomerDetail() {
  const { id, action } = useParams();
  const [editMode, setEditMode] = useState(action === 'edit');
  const [back, setBack] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customer, status } = useSelector((store) => store.customer);
  const isLoading = status === 'loading';

  useEffect(() => {
    dispatch(fetchCustomerById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!customer && back) {
      navigate('/customers');
    }
  });

  const handleUpdateUser = (customer) => {
    dispatch(updateCustomer({ ...customer, id }));
    setBack(true);
  };

  const handleDeleteCustomer = (id) => {
    dispatch(deleteCustomer(id));
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
            >
              Back
            </Button>
          </div>
          <h2>Customer#{id}</h2>
        </div>
        <Divider variant='middle' />
        <div className={cx('cancel-btn')}>
          {editMode && (
            <Button
              variant='contained'
              color='info'
              onClick={() => setEditMode(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
        </div>
        {!editMode ? (
          <div className={cx('detail')}>
            <div className={cx('info')}>
              <b>Fullname</b>
              <p>{customer?.fullname}</p>
            </div>
            <div className={cx('info')}>
              <b>Email</b>
              <p>{customer?.email}</p>
            </div>
            <div className={cx('info')}>
              <b>Address</b>
              <p>{customer?.address}</p>
            </div>
            <div className={cx('info')}>
              <b>Birthday</b>
              <p>{customer?.birthday}</p>
            </div>
            <div className={cx('info')}>
              <b>Star Points</b>
              <p>{customer?.starPoints}</p>
            </div>
            <div className={cx('info')}>
              <b>Customer Type</b>
              <p>{customer?.type}</p>
            </div>
            <div className={cx('info')}>
              <b>Created At</b>
              <p>{customer?.createdAt}</p>
            </div>
            <div className={cx('info')}>
              <b>Updated At</b>
              <p>{customer?.updatedAt}</p>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant='contained'
                  color='info'
                  onClick={() => setEditMode(true)}
                  disabled={isLoading}
                  startIcon={<Icon icon='lucide:edit' />}
                  fullWidth
                >
                  Edit
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant='contained'
                  color='red'
                  onClick={() => handleDeleteCustomer(id)}
                  disabled={isLoading}
                  startIcon={<Icon icon='mdi:bin' />}
                  fullWidth
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div className={cx('form-container')}>
            <CustomerForm
              onSubmit={handleUpdateUser}
              editedCustomer={customer}
              loading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}

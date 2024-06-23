import { useNavigate, useParams } from 'react-router-dom';
import styles from './CustomerDetail.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCustomer,
  fetchCustomerById,
} from '@redux/features/customerSlice';
import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  LinearProgress,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { HistoryInvoices } from '@components/DataTable';

const cx = classNames.bind(styles);
export default function CustomerDetail() {
  const { id } = useParams();
  const [back, setBack] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, status } = useSelector((store) => store.customer);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const isLoading = status === 'loading';
  const customer = data[0];
  const historyInvoices = customer?.invoices;

  useEffect(() => {
    dispatch(fetchCustomerById({ id, includeInvoices: true }));
  }, [dispatch, id]);

  useEffect(() => {
    if (back && !isLoading) {
      navigate('/customers');
    }
  }, [back, isLoading, navigate]);

  const handleDeleteCustomer = (id) => {
    dispatch(deleteCustomer({ id }));
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
          </div>
          <h2>Customer Detail</h2>
        </div>
        <Divider variant='middle' />
        <div className={cx('detail')}>
          <div className={cx('info')}>
            <b>ID</b>
            <p>{customer?.id}</p>
          </div>
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
          <div className={cx('action-btn')}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant='contained'
                  color='info'
                  onClick={() => navigate(`/customers/${id}/edit`)}
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
                  onClick={() => setDeleteDialog(true)}
                  disabled={isLoading}
                  startIcon={<Icon icon='mdi:bin' />}
                  fullWidth
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
        <h1 className={cx('historyInvoices')}>History Invoices</h1>
        <HistoryInvoices data={historyInvoices} />
      </div>
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>{`Are you sure you want to delete this customer?`}</DialogTitle>
        <DialogActions>
          <Button
            variant='contained'
            color='red'
            onClick={() => {
              handleDeleteCustomer(id);
              setDeleteDialog(false);
            }}
          >
            Delete
          </Button>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

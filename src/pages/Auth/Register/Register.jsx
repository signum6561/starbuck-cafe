import {
  Button,
  InputAdornment,
  LinearProgress,
  Link,
  TextField,
} from '@mui/material';
import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '@redux/features/authSlice';

const cx = classNames.bind(styles);
export default function Register() {
  // const { user, register } = useAuth();
  const { token, status, failed } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = status === 'loading';

  const form = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required!'),
      email: Yup.string().email('Invalid email format').required('Required!'),
      password: Yup.string().required('Required!'),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref('password')],
          'Your password and confirm password must match',
        )
        .required('Required!'),
    }),
    onSubmit: (values) => {
      dispatch(register(values));
    },
    validateOnChange: false,
  });

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate, token]);

  return (
    <div className={cx('wrapper')}>
      {isLoading && <LinearProgress />}
      <div className={cx('main-container')}>
        <h1 className={cx('title')}>Create New Account</h1>
        <form onSubmit={form.handleSubmit} noValidate>
          <TextField
            id='username'
            variant='standard'
            fullWidth
            label='Username'
            value={form.values.username}
            helperText={
              (form.errors.username || failed?.errors?.username[0]) ?? ' '
            }
            error={form.errors.username || failed?.errors?.username}
            placeholder='Username'
            onChange={form.handleChange}
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon className={cx('input-adorment')} icon='mdi:user' />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id='email'
            variant='standard'
            fullWidth
            label='Email'
            value={form.values.email}
            helperText={(form.errors.email || failed?.errors?.email[0]) ?? ' '}
            error={form.errors.email || failed?.errors?.email}
            placeholder='Email'
            onChange={form.handleChange}
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon
                    className={cx('input-adorment')}
                    icon='ic:baseline-email'
                  />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id='password'
            type='password'
            variant='standard'
            fullWidth
            label='Password'
            value={form.values.password}
            helperText={form.errors.password ?? ' '}
            error={form.errors.password}
            placeholder='Password'
            onChange={form.handleChange}
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon
                    className={cx('input-adorment')}
                    icon='material-symbols:lock'
                  />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id='confirmPassword'
            type='password'
            variant='standard'
            fullWidth
            label='Confirm Password'
            value={form.values.confirmPassword}
            helperText={form.errors.confirmPassword ?? ' '}
            error={form.errors.confirmPassword}
            placeholder='Confirm Password'
            onChange={form.handleChange}
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon
                    className={cx('input-adorment')}
                    icon='material-symbols:lock'
                  />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type='submit'
            variant='contained'
            fullWidth
            disabled={isLoading}
          >
            Create
          </Button>
          <Link href='/login' variant='body2' underline='none'>
            Already have account? Login
          </Link>
        </form>
      </div>
    </div>
  );
}

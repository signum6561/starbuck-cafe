import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  LinearProgress,
  Link,
  TextField,
} from '@mui/material';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Icon } from '@iconify/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@redux/features/authSlice';

const cx = classNames.bind(styles);

export default function Login() {
  const { status, errors } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const isLoading = status === 'loading';
  const isFailed = status === 'failed';

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Required!'),
      password: Yup.string().required('Required!'),
    }),

    onSubmit: (values) => {
      dispatch(login(values));
    },

    validateOnChange: false,
  });

  return (
    <div className={cx('wrapper')}>
      {isLoading && <LinearProgress />}
      <div className={cx('main-container')}>
        <h1 className={cx('title')}>Login</h1>
        <form onSubmit={form.handleSubmit} noValidate>
          <TextField
            id='email'
            variant='standard'
            fullWidth
            label='Email'
            value={form.values.email}
            helperText={form.errors.email ?? ' '}
            error={form.errors.email || isFailed}
            placeholder='Email'
            required
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
            id='password'
            type='password'
            variant='standard'
            fullWidth
            label='Password'
            value={form.values.password}
            helperText={(form.errors.password || errors?.message) ?? ' '}
            error={form.errors.password || isFailed}
            placeholder='Password'
            required
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
          <FormControlLabel
            control={
              <Checkbox
                id='remember'
                size='small'
                value={form.values.remember}
                onChange={form.handleChange}
              />
            }
            label='Remember me'
          />
          <Button
            type='submit'
            variant='contained'
            fullWidth
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/recovery' variant='body2' underline='none'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/register' variant='body2' underline='none'>
                {"Don't have an account?"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
  TextField,
} from '@mui/material';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Icon } from '@iconify/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import StarbuckLogo from '@components/StarbuckLogo';

const cx = classNames.bind(styles);

export default function Login() {
  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required!'),
      password: Yup.string().required('Required!'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    validateOnChange: false,
  });

  return (
    <div className={cx('wrapper')}>
      <div className={cx('main-container')}>
        <h1 className={cx('title')}>Login</h1>
        <form onSubmit={form.handleSubmit} noValidate>
          <TextField
            id='username'
            variant='standard'
            fullWidth
            label='Username'
            value={form.values.username}
            helperText={form.errors.username ?? ' '}
            error={form.errors.username}
            placeholder='Username'
            required
            onChange={form.handleChange}
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
            helperText={form.errors.password ?? ' '}
            error={form.errors.password}
            placeholder='Password'
            required
            onChange={form.handleChange}
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
            label='Remember me'
            control={<Checkbox size='small' />}
          />
          <Button type='submit' variant='contained' fullWidth>
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

import {
  FormHelperText,
  Grid,
  FormLabel,
  OutlinedInput,
  FormControl,
  Button,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import dayjs from 'dayjs';

export default function CustomerForm({ onSubmit, editedCustomer, loading }) {
  const form = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      address: '',
      birthday: null,
      starPoints: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(2, 'Minimum 2 characters')
        .required('Required!'),
      email: Yup.string().email('Invalid email format').required('Required!'),
      address: Yup.string()
        .min(2, 'Minimum 2 characters')
        .required('Required!'),
      birthday: Yup.date('Invalid date format').required('Required!'),
      starPoints: Yup.number()
        .positive('The value must be positive')
        .required('Required!'),
    }),
    onSubmit: (values) => {
      const newBirthday = new Date(values.birthday);
      onSubmit({
        ...values,
        birthday: newBirthday.toISOString().slice(0, 10),
      });
    },
    validateOnChange: false,
  });
  const { setFieldValue } = form;

  useEffect(() => {
    if (editedCustomer) {
      form.setValues({
        fullname: editedCustomer.fullname,
        email: editedCustomer.email,
        address: editedCustomer.address,
        birthday: dayjs(editedCustomer.birthday),
        starPoints: editedCustomer.starPoints,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedCustomer]);

  return (
    <Grid
      component='form'
      onSubmit={form.handleSubmit}
      container
      rowSpacing={1}
      columnSpacing={3}
      justifyContent='center'
      noValidate
    >
      <Grid item xs={12} sm={8}>
        <FormControl
          size='small'
          fullWidth
          onChange={form.handleChange}
          error={form.errors.fullname}
          required
          disabled={loading}
        >
          <FormLabel>Full Name</FormLabel>
          <OutlinedInput
            id='fullname'
            placeholder='ex: Nguyen Van A'
            value={form.values.fullname}
          />
          <FormHelperText>{form.errors.fullname ?? ' '}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl error={form.errors.birthday} fullWidth required>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FormLabel>Birthday</FormLabel>
            <DatePicker
              id='birthday'
              slotProps={{
                textField: {
                  size: 'small',
                  error: form.errors.birthday,
                  helperText: form.errors.birthday ?? ' ',
                },
              }}
              value={form.values.birthday}
              onChange={(newValue) => setFieldValue('birthday', newValue)}
              disabled={loading}
            />
          </LocalizationProvider>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl
          size='small'
          fullWidth
          onChange={form.handleChange}
          error={form.errors.address}
          required
          disabled={loading}
        >
          <FormLabel>Address</FormLabel>
          <OutlinedInput
            id='address'
            placeholder=''
            value={form.values.address}
          />
          <FormHelperText>{form.errors.address ?? ' '}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl
          size='small'
          fullWidth
          onChange={form.handleChange}
          error={form.errors.email}
          required
          disabled={loading}
        >
          <FormLabel>Email</FormLabel>
          <OutlinedInput
            id='email'
            placeholder='ex: example@gmail.com'
            value={form.values.email}
          />
          <FormHelperText>{form.errors.email ?? ' '}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={8} sm={3.5}>
        <FormControl
          size='small'
          fullWidth
          onChange={form.handleChange}
          error={form.errors.starPoints}
          required
          disabled={loading}
        >
          <FormLabel>Star Points</FormLabel>
          <OutlinedInput
            id='starPoints'
            type='number'
            value={form.values.starPoints}
          />
          <FormHelperText>{form.errors.starPoints ?? ' '}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={4} sm={2.5}>
        <FormControl size='small' fullWidth disabled={loading}>
          <FormLabel>Type</FormLabel>
          <OutlinedInput
            value={form.values.starPoints >= 100 ? 'Gold' : 'Green'}
            readOnly
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} alignSelf={'center'}>
        <Button type='submit' variant='contained' fullWidth disabled={loading}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
}

CustomerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editedCustomer: PropTypes.object,
  loading: PropTypes.bool,
};

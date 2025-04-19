'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import {   Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { DatePicker } from '@mui/x-date-pickers'
import { fBerthDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    gender: Yup.string().required('Gender is required'),
    dateOfBirth: Yup.string().required('Date of birth is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    dateOfBirth: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(data.email, data.password, data.firstName, data.lastName);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.message || error.message || 'Something went wrong. Please try again.'
      );
    }
  });



  const renderHead = (
    <Stack spacing={1} sx={{ mb: 0, p: 0 , alignItems: 'center'}}>
      <Typography variant="h5">Get started with your account</Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Typography variant="body2">Already have an account?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.login} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row', }} alignItems='center' spacing={2}>

        <FormControl fullWidth
            sx={{width: '50%'}}

        >
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            name='gender'
            label="Gender"
            // onChange={handleChange}
            onChange={(event) => setValue('gender', String(event.target.value))}
          >
            <MenuItem value='Male'> Male</MenuItem>
            <MenuItem value='Female'>Female</MenuItem>
          </Select>
        </FormControl>
        <DatePicker
          label="Date of Birth"
          name="dateOfBirth"
          onChange={(newValue) => setValue('dateOfBirth', fBerthDate(newValue))}
      sx={{
        width: '50%'
      }}
/>
        </Stack>
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            backgroundColor: '#00A76F'
          }}
        >
          Create account
        </LoadingButton>

      </Stack>
    </FormProvider>
  );

  return (
    <Box sx={{ backgroundColor: 'background.default', p: 2, borderRadius: 2,
      width: '100%', // Default width for smaller screens
      maxWidth: '420px', // Max width for larger screens
      '@media (min-width: 1024px)': {
        width: '420px', // Set width to 420px on larger screens (computers)
      },
    }}>
      {renderHead}

      {renderForm}

      {renderTerms}
    </Box>
  );
}

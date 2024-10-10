import * as Yup from 'yup';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import {paths} from 'src/routes/paths';
import {RouterLink} from 'src/routes/components';
import {useRouter, useSearchParams} from 'src/routes/hooks';

import {useBoolean} from 'src/hooks/use-boolean';
import {useAuthContext} from 'src/auth/hooks';
import {AUTH_API, PATH_AFTER_LOGIN} from 'src/config-global';

import FormProvider, {RHFAutocomplete, RHFTextField} from 'src/components/hook-form';
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import countrystatecity from '../../../_mock/map/csc.json';
import axios from "axios";
import {Button, MenuItem} from "@mui/material";
import {useSnackbar} from "notistack";

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const {register} = useAuthContext();
  const router = useRouter();
  const {enqueueSnackbar} = useSnackbar();
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    middleName: Yup.string(),  // Optional middle name
    lastName: Yup.string().required('Last name required'),
    contact: Yup.string().required('Contact is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    street: Yup.string().required('Street is required'),
    companyName: Yup.string().required('Company name is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    zipcode: Yup.string().required('Zipcode is required'),
    landmark: Yup.string(),
    role: Yup.string().required('Role is required'),
  });

  const defaultValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    contact: '',
    username: '',
    companyName: '',
    role: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    landmark: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: {isSubmitting},
    watch
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const requestData = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      email: data.email,
      contact: data.contact,
      companyName: data.companyName,
      role: data.role,
      password: data.password,
      username: data.username,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        zipcode: data.zipcode,
        landmark: data.landmark,
      },
    };

    try {
      const URL = `${AUTH_API}/auth/register`;
      const res = await axios.post(URL, requestData);
      console.log(res)
      const user = res.data.data;

      enqueueSnackbar('Registration Successful', {variant: 'success'});

      // const {jwt, jwtRefresh} = user.other_info;
      // setSession(jwt, jwtRefresh);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      enqueueSnackbar(`${error.response?.data?.message || error.message}`, {variant: 'error'});
      // console.error(error);
      // reset();
      // setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{mb: 5, position: 'relative'}}>
      <Typography variant="h4">Get started absolutely free</Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>
        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 2.5,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
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
    <Grid container spacing={3}>
      <Grid xs={12} md={12}>
        <Card sx={{p: 3}}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
            }}
          >
            <RHFTextField name="firstName" label="First Name"/>
            <RHFTextField name="middleName" label="Middle Name"/> {/* New middle name field */}
            <RHFTextField name="lastName" label="Last Name"/>
            <RHFTextField
              name="contact"
              label="Contact"
              inputProps={{
                maxLength: 10,
                inputMode: 'numeric',
                pattern: "[0-9]*"
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }}
            />
            <RHFTextField name="email" label="Email"/>
            <RHFTextField name="username" label="Username"/>
            <RHFTextField name="password" label="Password"/>
          </Box>
          <Stack>
            <Box sx={{fontWeight: 'bold', fontSize: '20px', mb: 2, mt: 2}}>Address details</Box>
          </Stack>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
            }}
          >
            <RHFTextField name="street" label="Street"/>
            <RHFTextField name="landmark" label="Landmark"/>
            <RHFAutocomplete
              name="country"
              label="Country"
              placeholder="Choose a country"
              options={countrystatecity.map((country) => country.name)}
              isOptionEqualToValue={(option, value) => option === value}
            />
            <RHFAutocomplete
              name="state"
              label="State"
              placeholder="Choose a State"
              options={
                watch('country')
                  ? countrystatecity
                  .find((country) => country.name === watch('country'))
                  ?.states.map((state) => state.name) || []
                  : []
              }
              isOptionEqualToValue={(option, value) => option === value}
            />
            <RHFAutocomplete
              name="city"
              label="City"
              placeholder="Choose a City"
              options={
                watch('state')
                  ? countrystatecity
                  .find((country) => country.name === watch('country'))
                  ?.states.find((state) => state.name === watch('state'))
                  ?.cities.map((city) => city.name) || []
                  : []
              }
              isOptionEqualToValue={(option, value) => option === value}
            />
            <RHFTextField name="zipcode" label="Postal Code" inputProps={{
              maxLength: 6,
              inputMode: 'numeric',
              pattern: "[0-9]*"
            }}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                          }}/>
          </Box>
          <Stack>
            <Box sx={{fontWeight: 'bold', fontSize: '20px', mb: 2, mt: 2}}>Company details</Box>
          </Stack>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
            }}
          >
            <RHFTextField name="companyName" label="Company Name"/>
            <RHFTextField
              select
              name="role"
              label="Role"
              defaultValue="Admin"
            >
              <MenuItem value="Admin">Admin</MenuItem>
            </RHFTextField>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      {renderForm}

      <Stack alignItems="flex-end" sx={{mt: 3}}>
        <Button type="submit" variant="contained" loading={isSubmitting}>
          Submit
        </Button>
      </Stack>

      {renderTerms}
    </FormProvider>
  );
}

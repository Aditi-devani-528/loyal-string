import * as Yup from 'yup';
import { useMemo, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import countrystatecity from '../../_mock/map/csc.json';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import axios from 'axios';
import { useGetBranch } from 'src/api/branch';
import { useGetDepartment } from 'src/api/department';
import { DatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

export default function EmployeeCreateNewForm({ currentUser }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const { branch } = useGetBranch();

  const { department } = useGetDepartment();

  const NewUserSchema = Yup.object().shape({

    branch: Yup.string().required('Branch is required'),
    // department: Yup.string().required('Department is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    zipCode: Yup.string()
      .required('Zip code is required')
      .matches(/^\d{6}(-\d{4})?$/, 'Zip code must be a valid format (e.g., 123456 or 12345-6789)'),
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    contact: Yup.string()
      .required('Contact is required')
      .matches(/^\d{10}$/, 'Contact must be a valid 10-digit phone number'),
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    bankName: Yup.string().required('Bank Name is required'),
    accountNumber: Yup.string()
      .required('Account Number is required')
      .matches(/^\d{9,18}$/, 'Account Number must be between 9 to 18 digits'),
    ifscCode: Yup.string()
      .required('IFSC Code is required')
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'IFSC Code must be in the format ABCD0123456'),
    panCard: Yup.string()
      .required('Pan Card is required')
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Pan Card must be in the format ABCDE1234F'),
    aadharCard: Yup.string()
      .required('Aadhar Card is required')
      .matches(/^\d{12}$/, 'Aadhar Card must be a valid 12-digit number'),
    dob: Yup.date()
      .required('Date of Birth is required')
      .max(new Date(), 'Date of Birth cannot be in the future'),
    joiningDate: Yup.date()
      .required('Joining Date is required')
      .min(Yup.ref('dob'), 'Joining Date cannot be before Date of Birth')
      .max(new Date(), 'Joining Date cannot be in the future'),
    gender: Yup.string().required('Gender is required'),
    workLocation: Yup.string().required('Work Location is required'),
    username: Yup.string().required('User Name is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const defaultValues = useMemo(
    () => ({
      branch: currentUser?.branch || null,
      department: currentUser?.department || null,
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      email: currentUser?.email || '',
      contact: currentUser?.contact || '',
      street: currentUser?.addressDetails.street || '',
      city: currentUser?.addressDetails.city || '',
      state: currentUser?.addressDetails.state || '',
      zipCode: currentUser?.addressDetails.zipCode || '',
      country: currentUser?.addressDetails.country || '',
      bankName: currentUser?.bankDetails.bankName || '',
      accountNumber: currentUser?.bankDetails.accountNumber || '',
      ifscCode: currentUser?.bankDetails.ifscCode || '',
      panCard: currentUser?.panCard || '',
      aadharCard: currentUser?.aadharCard || '',
      dob: new Date(currentUser?.dob) || null,
      joiningDate: new Date(currentUser?.joiningDate) || null,
      gender: currentUser?.gender || '',
      workLocation: currentUser?.workLocation || '',
      username: currentUser?.username || '',
      password: currentUser?.password || '',
    }),
    [currentUser]
  );
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentUser) {
      currentUser
      reset(defaultValues);
    }
  }, [currentUser, defaultValues, reset]);
  const onSubmit = handleSubmit(async (data) => {
    try {
      const employeePayload = {
        branch: data.branch.name,
        department: data.department.name,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        contact: data.contact,
        addressDetails: {
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
        },
        bankDetails: {
          bankName: data.bankName,
          accountNumber: data.accountNumber,
          ifscCode: data.ifscCode,
        },
        panCard: data.panCard,
        aadharCard: data.aadharCard,
        dob: data.dob,
        joiningDate: data.joiningDate,
        gender: data.gender,
        workLocation: data.workLocation,
        username: data.username,
        password: data.password,
      };
      console.log(data)
      const url = currentUser
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/employee/${currentUser?._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/employee`;

      const method = currentUser ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: employeePayload,
        headers: { 'Content-Type': 'application/json' },
      });

      enqueueSnackbar(response?.data?.message || 'employee saved successfully!', {
        variant: 'success',
      });
      router.push(paths.dashboard.userMaster.employee);
    } catch (error) {
      console.error('Error saving employee:', error);
      enqueueSnackbar('Something went wrong. Please try again.', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Grid md={4}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                Personal Details
              </Typography>
            </Grid>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
              <RHFTextField name="email" label="Emp Email" />
              <RHFTextField name="contact" label="Mobile Number" />
              <RHFTextField name="street" label="Street Address" />
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
              <RHFTextField name="zipCode" label="Zip Code"
                inputProps={{
                  maxLength: 6,
                  inputMode: 'numeric',
                }}
              />
              <RHFTextField name="aadharCard" label="Aadhar No" />
              <RHFTextField name="panCard" label="Pan No" />

              <Controller
                name='joiningDate'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label='Joining Date'
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        InputLabelProps: { shrink: true },
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />
              <Controller
                name='dob'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label='Date Of Birth'
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        InputLabelProps: { shrink: true },
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />

              <RHFAutocomplete
                name="gender"
                type="gender"
                label="Gender"
                placeholder="Choose a Gender"
                InputLabelProps={{ shrink: true }}
                options={['Male', 'Female', 'Other']}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              />
              <RHFTextField name="workLocation" label="Work Location" />
            </Box>
          </Card>
        </Grid>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Grid md={4}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                System Details
              </Typography>
            </Grid>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              {branch &&
                <RHFAutocomplete
                  name="branch"
                  type="branch"
                  label="Branch"
                  placeholder="Choose a Branch"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  options={branch.map((item) => item.name)}
                  getOptionLabel={(option) => option}
                  onChange={(event, value) => {
                    setValue('branch', value);
                  }}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  renderOption={(props, option) => (
                    <li {...props} key={option._id}>
                      {option}
                    </li>
                  )}
                />
              }

              {department &&
                <RHFAutocomplete
                  name="department"
                  type="department"
                  label="Department"
                  placeholder="Choose a Department"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  options={department.map((item) => item)}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) => {
                    setValue('department', value);
                  }}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  renderOption={(props, option) => (
                    <li {...props} key={option._id}>
                      {option.name}
                    </li>
                  )}
                />
              }

              <RHFTextField name="username" label="User Name" />
              {!currentUser && <RHFTextField name="password" label="Password" />}
            </Box>
          </Card>
        </Grid>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Grid md={4}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                Bank Details
              </Typography>
            </Grid>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name="bankName" label="Bank Name" />
              <RHFTextField name="accountNumber" label="Bank Account No" />
              <RHFTextField name="ifscCode" label="IFSC Code" />
            </Box>
          </Card>

          <Grid xs={12} sx={{ display: 'flex', justifyContent: 'end', gap: 2, alignItems: 'center' }}>
            <Stack direction="row" spacing={2} sx={{ mt: 0 }}>
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="button"
                  variant="outlined"
                  onClick={() => reset()}
                >
                  Reset
                </LoadingButton>
              </Stack>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  onClick={() => handleSubmit()}
                >
                  {currentUser ? 'Update employee' : 'Create employee'}
                </LoadingButton>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

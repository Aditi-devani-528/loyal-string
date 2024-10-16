import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

// import { countries } from 'src/assets/data';

import { countries } from '../../_mock/map/countries';
import { cities } from '../../_mock/map/cities';

import countrystatecity from '../../_mock/map/csc.json';

import Label from 'src/components/label';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import axios from 'axios';
import { useGetBranch } from 'src/api/branch';
import { useGetDepartment } from 'src/api/department';

// ----------------------------------------------------------------------

export default function EmployeeCreateNewForm({ currentUser }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const { branch } = useGetBranch();
  const branchOptions = branch.map((item) => ({
    name: item.name,
    id: item._id,
  }));

  const handleBranchSelect = (event, selectedBranch) => {
    setValue('branch', selectedBranch);
  };

  const { department } = useGetDepartment();
  const departmentOptions = department.map((item) => ({
    name: item.name,
    id: item._id,
  }));

  const handleDepartmentSelect = (event, selectedDepartment) => {
    setValue('department', selectedDepartment);
  };

  const NewUserSchema = Yup.object().shape({
    branch: Yup.object().shape({
      name: Yup.string().required('Branch name is required'),
      id: Yup.string().required('Branch id is required'),
    }).required('Branch is required'),

    department: Yup.object().shape({
      name: Yup.string().required('Department name is required'),
      id: Yup.string().required('Department id is required'),
    }).required('Department is required'),

    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    zipCode: Yup.string()
      .required('Zip code is required')
      .matches(/^\d{5}(-\d{4})?$/, 'Zip code must be a valid format (e.g., 12345 or 12345-6789)'),
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
    // role: Yup.string().required('Role is required'),
    // reportingTo: Yup.string().required('Reporting To is required'),
    username: Yup.string().required('User Name is required'),
    password: Yup.string()
      .required('Password is required')
  });

  // const NewUserSchema = Yup.object().shape({
  //   branch: Yup.string().required('Branch is required'),
  //   department: Yup.string().required('Department Name is required'),
  //   firstName: Yup.string().required('First Name is required'),
  //   lastName: Yup.string().required('Last Name is required'),
  //   zipCode: Yup.string().required('Zip code is required'),
  //   email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  //   contact: Yup.string().required('Contact is required'),
  //   street: Yup.string().required('Street is required'),
  //   city: Yup.string().required('City is required'),
  //   state: Yup.string().required('State is required'),
  //   country: Yup.string().required('Country is required'),
  //   bankName: Yup.string().required('Bank Name is required'),
  //   accountNumber: Yup.string().required('Account Number is required'),
  //   ifscCode: Yup.string().required('IFSC Code is required'),
  //   panCard: Yup.string().required('Pan Card is required'),
  //   aadharCard: Yup.string().required('Aadhar Card is required'),
  //   dob: Yup.string().required('Date Of birth Card is required'),
  //   joiningDate: Yup.string().required('Joining Date Card is required'),
  //   gender: Yup.string().required('Gender is required'),
  //   workLocation: Yup.string().required('Work Location is required'),
  //   role: Yup.string().required('Role is required'),
  //   reportingTo: Yup.string().required('Reporting To is required'),
  //   username: Yup.string().required('User Name To is required'),
  //   password: Yup.string().required('Password To is required'),
  // });

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
      dob: currentUser?.dob || '',
      joiningDate: currentUser?.joiningDate || '',
      gender: currentUser?.gender || '',
      workLocation: currentUser?.workLocation || '',
      // role: currentUser?.role || '',
      // reportingTo: currentUser?.reportingTo || '',
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
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentUser) {
      reset(defaultValues);
    }
  }, [currentUser, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const employeePayload = {
        branch: data.branch.id,
        department: data.department.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        contact: data.contact,
        addressDetails: {
          street: data.street,
          city: data.city,
          state: data.state,
          zipcode: data.zipcode,
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
        // role: data.role.id,
        // reportingTo: data.reportingTo,
        username: data.username,
        password: data.password,
      };

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

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

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
              <RHFTextField name="joiningDate" label="Joining Date" type="date" InputLabelProps={{ shrink: true }} />
              <RHFTextField name="dob" label="Date Of Birth" type="date" InputLabelProps={{ shrink: true }} />
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

              <RHFAutocomplete
                name="branch"
                type="branch"
                label="Branch"
                placeholder="Choose a Branch"
                InputLabelProps={{ shrink: true }}
                fullWidth
                options={branchOptions}
                getOptionLabel={(option) => option.name}
                onChange={handleBranchSelect}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
              />

              <RHFAutocomplete
                name="department"
                type="department"
                label="Department"
                placeholder="Choose a Department"
                InputLabelProps={{ shrink: true }}
                fullWidth
                options={departmentOptions}
                getOptionLabel={(option) => option.name}
                onChange={handleDepartmentSelect}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
              />

              {/* <RHFAutocomplete
                name="role"
                type="role"
                label="Roles"
                placeholder="Choose a Role"
                InputLabelProps={{ shrink: true }}
                options={['Male', 'Female', 'Other']}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              />

              <RHFAutocomplete
                name="reportingTo"
                type="reportingTo"
                label="Reporting To"
                placeholder="Choose a Reporting To"
                InputLabelProps={{ shrink: true }}
                options={['Male', 'Female', 'Other']}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              /> */}
              <RHFTextField name="username" label="User Name" />
              <RHFTextField name="password" label="Password" />
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
              <RHFTextField name="branch" label="Branch Name" />
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

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useCallback } from 'react';
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

import { countries } from 'src/assets/data';

import Label from 'src/components/label';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import axios from 'axios';
import countrystatecity from '../../_mock/map/csc.json';

// ----------------------------------------------------------------------

export default function CompanyCreateNewForm({ currentCompany }) {
  console.log(currentCompany);
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewCompanySchema  = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    short_name: Yup.string().required('short name is required'),
    owner_name: Yup.string().required('owner name is required'),
    registered_address: Yup.string().required('registered address is required'),
    factory_address: Yup.string().required('factory address is required'),
    email: Yup.string().required('email is required'),
    contact: Yup.string().required('contact is required'),
    year_of_establishment: Yup.string().required('year of establishment is required'),
    website: Yup.string().required('website is required'),
    GST: Yup.string().required('GST code is required'),
    PAN: Yup.string().required('PAN code is required'),
    AADHAR: Yup.string().required('aadhar  code is required'),
    VAT: Yup.string().required('VAT code is required'),
    CGST: Yup.string().required('CGST code is required'),
    logo_url: Yup.string().required('logo url is required'),
    country: Yup.string().required('country is required'),
    state: Yup.string().required('state is required'),
    city: Yup.string().required('city is required'),
    zipcode: Yup.string().required('zipcode is required'),
    status: Yup.string(),
    isVerified: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCompany?.name || '',
      short_name: currentCompany?.short_name || '',
      owner_name: currentCompany?.owner_name || '',
      registered_address: currentCompany?.registered_address || '',
      factory_address: currentCompany?.factory_address || '',
      email: currentCompany?.email || '',
      contact: currentCompany?.contact || '',
      year_of_establishment: currentCompany?.year_of_establishment || '',
      website: currentCompany?.website || '',
      GST: currentCompany?.GST || '',
      PAN: currentCompany?.PAN || '',
      VAT: currentCompany?.VAT || '',
      AADHAR: currentCompany?.AADHAR || '',
      CGST: currentCompany?.CGST || '',
      logo_url: currentCompany?.logo_url || '',
      country: currentCompany?.country || '',
      state: currentCompany?.state || '',
      city: currentCompany?.city || '',
      zipcode: currentCompany?.zipcode || '',
      isVerified: currentCompany?.isVerified || true,
    }),
    [currentCompany]
  );

  const methods = useForm({
    resolver: yupResolver(NewCompanySchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    alert('hello')
    try {
      const companyPayload = {
        name: data.name,
        short_name: data.short_name,
        owner_name: data.owner_name,
        registered_address: data.registered_address,
        factory_address: data.factory_address,
        email: data.email,
        contact: data.contact,
        year_of_establishment: data.year_of_establishment,
        website: data.website,
        GST: data.GST,
        PAN: data.PAN,
        AADHAR: data.AADHAR,
        VAT: data.VAT,
        CGST: data.CGST,
        logo_url: data.logo_url,
        country: data.country,
        state: data.state,
        city: data.city,
        zipcode: data.zipcode,
        status: data.status,
        isVerified: data.isVerified,
      };

      const url = currentCompany
        ? `https://gold-erp.onrender.com/api/company/${currentCompany._id}`
        : `https://gold-erp.onrender.com/api/company/`;

      const method = currentCompany ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: companyPayload,
        headers: { 'Content-Type': 'application/json' },
      });
      enqueueSnackbar(response?.data?.message || 'Company saved successfully!', {
        variant: 'success',
      });

      // Reset form and redirect after submission
      reset();
      router.push(paths.dashboard.userMaster.company);
    } catch (error) {
      console.error('Error saving company:', error);
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={3}>
        {/* <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={
                  (values.status === 'active' && 'success') ||
                  (values.status === 'banned' && 'error') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {currentUser && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />

            {currentUser && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error">
                  Delete User
                </Button>
              </Stack>
            )}
          </Card>
        </Grid> */}

        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Company Name" />
              <RHFTextField name="short_name" label="Company Short Name" />
              <RHFTextField name="owner_name" label="Owner Name" />
              <RHFTextField name="registered_address" label="Registered Address" />
              <RHFTextField name="factory_address" label="Factory Address" />
              <RHFTextField name="contact" label="Contact Number" />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="year_of_establishment" label="Year of Establishment" />
              <RHFTextField name="website" label="Website" />
              <RHFTextField name="GST" label="GSTIN No." />
              <RHFTextField name="PAN" label="PAN No." />
              <RHFTextField name="AADHAR" label="Aadhar No." />
              <RHFTextField name="VAT" label="VAT No." />
              <RHFTextField name="CGST" label="CGST No." />
              <RHFTextField name="logo_url" label="Logo URL" />
              <RHFAutocomplete
                name='country'
                label='Country'
                placeholder='Choose a country'
                options={countrystatecity.map((country) => country.name)}
                isOptionEqualToValue={(option, value) => option === value}
              />
              <RHFAutocomplete
                name='state'
                label='State'
                placeholder='Choose a State'
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
                name='city'
                label='City'
                placeholder='Choose a City'
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
              <RHFTextField name="zipcode" label="Zipcode" />
            </Box>

            <Stack alignItems='flex-end' sx={{ mt: 3 }}>
              <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                {currentCompany ? 'Update Category' : 'Create Category'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}



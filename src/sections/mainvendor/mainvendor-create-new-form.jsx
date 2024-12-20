import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFAutocomplete,
  RHFTextField,
} from 'src/components/hook-form';
import axios from 'axios';
import { useAuthContext } from '../../auth/hooks';
import { useGetCategory } from '../../api/category';
import { paths } from '../../routes/paths';
import countrystatecity from '../../_mock/map/csc.json';

// ----------------------------------------------------------------------

export default function MainVendorCreateNewForm({ currentVendor }) {
  const { user } = useAuthContext();
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const [includeTaxes, setIncludeTaxes] = useState(false);

  // Yup validation schema
  const VendorSchema = Yup.object().shape({
    vendorName: Yup.string().required('Vendor name is required'),
    firmName: Yup.string().required('Firm name is required'),
    firmDetails: Yup.string().required('Firm details are required'),
    short_name: Yup.string().required('Short name is required'),
    fine_percentage: Yup.number().required('Fine percentage is required').typeError('Must be a number'),
    today_rate: Yup.number().required("Today's rate is required").typeError('Must be a number'),
    contact: Yup.string().required('Contact number is required').matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Must be at least 10 digits').max(15, 'Must be no more than 15 digits'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    panCard: Yup.string().required('PAN is required'),
    gstNumber: Yup.string().required('GST number is required'),
    type: Yup.string().required('type is required'),
    onlineStatus: Yup.string().required('onlineStatus is required'),
    balanceAmount: Yup.string().required('balance Amount is required'),
    advanceAmount: Yup.string().required('advance Amount is required'),
    fineGold: Yup.string().required('fineGold is required'),
    fineSilver: Yup.string().required('fineSilver is required'),
    addToCustomer: Yup.string().required('addToCustomer is required'),

  });

  const defaultValues = useMemo(
    () => ({
      vendorName: currentVendor?.vendorName || '',
      firmName: currentVendor?.firmName || '',
      firmDetails: currentVendor?.firmDetails || '',
      short_name: currentVendor?.short_name || '',
      category: currentVendor?.category || { name: '', id: '' },
      fine_percentage: currentVendor?.fine_percentage || '',
      today_rate: currentVendor?.today_rate || '',
      contact: currentVendor?.contact || '',
      email: currentVendor?.email || '',
      address: currentVendor?.addressDetails?.address || '',
      country: currentVendor?.addressDetails?.country || '',
      state: currentVendor?.addressDetails?.state || '',
      city: currentVendor?.addressDetails?.city || '',
      panCard: currentVendor?.panCard || '',
      gstNumber: currentVendor?.gstNumber || '',
      type: currentVendor?.type || '',
      onlineStatus: currentVendor?.onlineStatus || '',
      balanceAmount: currentVendor?.balanceAmount || '',
      advanceAmount: currentVendor?.advanceAmount || '',
      fineGold: currentVendor?.fineGold || '',
      fineSilver: currentVendor?.fineSilver || '',
      addToCustomer: currentVendor?.addToCustomer || 'No',
    }),
    [currentVendor]
  );

  const methods = useForm({
    // resolver: yupResolver(VendorSchema),
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
    if (currentVendor) {
      reset(defaultValues);
    }
  }, [currentVendor, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentVendor?.taxes || 0);
    }
  }, [currentVendor?.taxes, includeTaxes, setValue]);

  // Form submit handler
  const onSubmit = handleSubmit(async (data) => {
    try {
      // Create payload for the API
      const vendorPayload = {
        vendorName: data.vendorName,
        firmName: data.firmName,
        firmDetails: data.firmDetails,
        email: data.email,
        contact: data.contact,
        panCard: data.panCard,
        gstNumber: data.gstNumber,
        type: data.type,
        onlineStatus: data.onlineStatus,
        balanceAmount: data.balanceAmount,
        advanceAmount: data.advanceAmount,
        fineGold: data.fineGold,
        fineSilver: data.fineSilver,
        short_name: data.short_name,
        addToCustomer: data.addToCustomer,
        addressDetails: {
          address: data.address,
          country: data.country,
          state: data.state,
          city: data.city,
        },
      };


      // Determine URL and method based on create/update action
      const url = currentVendor
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/vendor/${currentVendor._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/vendor`;

      const method = currentVendor ? 'put' : 'post';

      // API request
      const response = await axios({
        method,
        url,
        data: vendorPayload,
        headers: { 'Content-Type': 'application/json' },
      });

      // Success message and redirect
      enqueueSnackbar(response?.data?.message || 'Vendor saved successfully!', {
        variant: 'success',
      });
      router.push(paths.dashboard.general.vendor);
    } catch (error) {
      console.error('Error saving purity:', error);
      enqueueSnackbar('Something went wrong. Please try again.', {
        variant: 'error',
      });
    }
  });


  // UI remains unchanged
  const renderDetails = (
    <>
      {mdUp && (
        <Grid xs={12}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Vendor Details
          </Typography>
        </Grid>
      )}

      <Grid xs={12}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="vendorName" label="Vendor Name" />
              <RHFTextField name="firmName" label="Firm Name" />
              <RHFTextField name="firmDetails" label="Firm Details" />
              <RHFTextField name="contact" label="Contact No." />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="address" label="Address" />
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
              <RHFTextField name="panCard" label="Vendor Pan No." />
              <RHFTextField name="gstNumber" label="GST No." />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );
  const renderAddintional = (
    <>
      {mdUp && (
        <Grid xs={12}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Additional Details
          </Typography>
        </Grid>
      )}

      <Grid xs={12}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="type" label="Vendor Type" />
              <RHFAutocomplete
                name='onlineStatus'
                placeholder='Online Status'
                fullWidth
                options={['Active', 'InActive']}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              />
              <RHFTextField name="balanceAmount" label="Balance Amt." />
              <RHFTextField name="advanceAmount" label="Advance Amt." />
              <RHFTextField name="fineGold" label="Fine Gold" />
              <RHFTextField name="fineSilver" label="Fine Silver" />
              <RHFAutocomplete
                name='addToCustomer'
                placeholder='Add To Customer'
                fullWidth
                options={['yes', 'No']}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid xs={12} />}
      <Grid xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Publish"
          sx={{ flexGrow: 1, pl: 3 }}
        />
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
          >
            {currentVendor ? 'Update Vendor' : 'Create Vendor'}
          </LoadingButton>
        </Stack>
        </Stack>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}
        {renderAddintional}
        {renderActions}
      </Grid>
    </FormProvider>
  );
}

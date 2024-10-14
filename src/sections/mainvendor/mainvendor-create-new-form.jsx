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

// ----------------------------------------------------------------------

export default function MainVendorCreateNewForm({ currentVendor }) {
  const { user } = useAuthContext();
  const { category } = useGetCategory();
  const categoryOptions = category.map((item) => ({
    name: item.name,
    id: item._id,
  }));

  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const [includeTaxes, setIncludeTaxes] = useState(false);

  // Yup validation schema
  const VendorSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    desc: Yup.string().required('Description is required'),
    short_name: Yup.string().required('Short name is required'),
    fine_percentage: Yup.string().required('Fine percentage is required'),
    today_rate: Yup.string().required("Today's rate is required"),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentPurity?.name || '',
      desc: currentPurity?.desc || '',
      short_name: currentPurity?.short_name || '',
      category: currentPurity?.category || { name: '', id: '' },
      fine_percentage: currentPurity?.fine_percentage || '',
      today_rate: currentPurity?.today_rate || '',
    }),
    [currentPurity]
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
    if (currentPurity) {
      reset(defaultValues);
    }
  }, [currentPurity, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentPurity?.taxes || 0);
    }
  }, [currentPurity?.taxes, includeTaxes, setValue]);

  // Form submit handler
  const onSubmit = handleSubmit(async (data) => {
    try {
      // Create payload for the API
      const companyPayload = {
        category: data.category.id, // Send only category ID to the API
        name: data.name,
        desc: data.desc,
        short_name: data.short_name,
        fine_percentage: data.fine_percentage,
        today_rate: data.today_rate,
      };


      // Determine URL and method based on create/update action
      const url = currentVendor
        ? `https://gold-erp.onrender.com/api/company/${user?.company}/vendor/${currentVendor._id}`
        : `https://gold-erp.onrender.com/api/company/${user?.company}/vendor`;

      const method = currentVendor ? 'put' : 'post';

      // API request
      const response = await axios({
        method,
        url,
        data: companyPayload,
        headers: { 'Content-Type': 'application/json' },
      });

      // Success message and redirect
      enqueueSnackbar(response?.data?.message || 'Vendor saved successfully!', {
        variant: 'success',
      });
      router.push('/dashboard/productMaster/purity');
    } catch (error) {
      console.error('Error saving purity:', error);
      enqueueSnackbar('Something went wrong. Please try again.', {
        variant: 'error',
      });
    }
  });

  const handleCategorySelect = (event, selectedCategory) => {
    setValue('category', selectedCategory);
  };

  // UI remains unchanged
  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={3}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Vendor Details
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={9}>
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
              <RHFTextField name="Vendor Code" label="Vendor Code" />
              <RHFTextField name="vendorName" label="Vendor Name" />
              <RHFTextField name="firmName" label="Firm Name" />
              <RHFTextField name="firmDetails" label="Firm Details" />
              <RHFTextField name="contact" label="Contact No." />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="country" label="Country" />
              <RHFTextField name="state" label="State" />
              <RHFTextField name="city" label="City" />
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
        <Grid md={3}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Vendor Details
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={9}>
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
              <RHFTextField name="onlineStatus" label="Online Status" />
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
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Publish"
          sx={{ flexGrow: 1, pl: 3 }}
        />
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {currentVendor ? 'Update Vendor' : 'Create Vendor'}
          </LoadingButton>
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

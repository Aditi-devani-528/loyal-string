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

export default function PurityCreateNewForm({ currentPurity }) {
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
  const PuritySchema = Yup.object().shape({
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
    resolver: yupResolver(PuritySchema),
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
      const categoryPayload = {
        category: data.category.id, // Send only category ID to the API
        name: data.name,
        desc: data.desc,
        short_name: data.short_name,
        fine_percentage: data.fine_percentage,
        today_rate: data.today_rate,
      };


      // Determine URL and method based on create/update action
      const url = currentPurity
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/purity/${currentPurity._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/purity`;

      const method = currentPurity ? 'put' : 'post';

      // API request
      const response = await axios({
        method,
        url,
        data: categoryPayload,
        headers: { 'Content-Type': 'application/json' },
      });

      // Success message and redirect
      enqueueSnackbar(response?.data?.message || 'Purity saved successfully!', {
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
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Add New Purity
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
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
              <RHFTextField name="name" label="Purity Name" />
              <RHFAutocomplete
                name="category"
                placeholder="Category"
                fullWidth
                options={categoryOptions}
                getOptionLabel={(option) => option.name} // Show category name
                onChange={handleCategorySelect} // Call handleCategorySelect on change
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
              />

              <RHFTextField name="short_name" label="Short Name" />
              <RHFTextField name="desc" label="Description" />

              <RHFTextField name="fine_percentage" label="Fine Percentage" />
              <RHFTextField name="today_rate" label="Today's Rate" />
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
              >
                {currentPurity ? 'Update Purity' : 'Create Purity'}
              </LoadingButton>
            </Stack>
          </Stack>
        </Grid>

      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}

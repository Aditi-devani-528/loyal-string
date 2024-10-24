import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axios from 'axios';
import { useAuthContext } from 'src/auth/hooks';
import { useGetCompany } from 'src/api/company';
import { useGetBranch } from 'src/api/branch';
import { DatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

export default function OccasionCreateNewForm({ currentOccasion }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const { company } = useGetCompany();
  const { branch } = useGetBranch();

  const companyOption = company
    ? company.map((item) => ({
        name: item.name,
        id: item._id,
      }))
    : [];

  const branchOption = branch
    ? branch.map((item) => ({
        name: item.name,
        id: item._id,
      }))
    : [];

  const handleCompanySelect = (event, selectedCompany) => {
    setValue('company', selectedCompany);
  };

  const handlebranchSelect = (event, selectedbranch) => {
    setValue('branch', selectedbranch);
  };

  const [includeTaxes, setIncludeTaxes] = useState(false);

  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const OccasionSchema = Yup.object().shape({
    company: Yup.object()
      .shape({
        name: Yup.string().required('Company name is required'),
        id: Yup.string().required('Company id is required'),
      })
      .required('Company is required'),
    branch: Yup.object()
      .shape({
        name: Yup.string().required('Branch name is required'),
        id: Yup.string().required('Branch id is required'),
      })
      .required('Branch is required'),
    name: Yup.string().required('Name is required'),
    status: Yup.string().required('status is required'),
    desc: Yup.string().required('desc is required'),
    slug: Yup.string().required('slug is required'),
    from: Yup.string().required('from is required'),
    to: Yup.string().required('to is required'),
  });

  const defaultValues = useMemo(
    () => ({
      company: currentOccasion?.company || null,
      branch: currentOccasion?.branch || null,
      name: currentOccasion?.name || '',
      status: currentOccasion?.status || '',
      desc: currentOccasion?.desc || '',
      slug: currentOccasion?.slug || '',
      from: currentOccasion?.from ? new Date(currentOccasion.from) : null, 
      to: currentOccasion?.to ? new Date(currentOccasion.to) : null,
    }),
    [currentOccasion]
  );
  

  const methods = useForm({
    resolver: yupResolver(OccasionSchema),
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
    if (currentOccasion) {
      reset(defaultValues);
    }
  }, [currentOccasion, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentOccasion?.taxes || 0);
    }
  }, [currentOccasion?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const occasionPayload = {
        company: data.company.id,
        branch: data.branch.id,
        name: data.name,
        status: data.status,
        desc: data.desc,
        slug: data.slug,
        from: data.from,
        to: data.to,
      };

      // Determine URL and method based on create/update action
      const url = currentOccasion
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/occasion/${currentOccasion._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/occasion`;

      const method = currentOccasion ? 'put' : 'post';

      //  API request
      const response = await axios({
        method,
        url,
        data: occasionPayload,
        headers: { 'Content-Type': 'application/json' },
      });

      enqueueSnackbar(response?.data?.message || 'Occasion saved successfully!', {
        variant: 'success',
      });
      router.push(paths.dashboard.productMaster.occasion);
    } catch (error) {
      console.error('Error saving occasion:', error);
      enqueueSnackbar('Something went wrong. Please try again.', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {mdUp && (
          <Grid md={4}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {currentOccasion ? 'Edit Occassion' : 'Add New Occassion'}
            </Typography>
          </Grid>
        )}

        <Grid xs={12} md={12}>
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
                <RHFAutocomplete
                  name="company"
                  placeholder="Company"
                  fullWidth
                  options={companyOption}
                  getOptionLabel={(option) => option.name}
                  onChange={handleCompanySelect}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  )}
                />
                <RHFAutocomplete
                  name="branch"
                  placeholder="branch"
                  fullWidth
                  options={branchOption}
                  getOptionLabel={(option) => option.name}
                  onChange={handlebranchSelect}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  )}
                />
                <RHFTextField name="name" label="Name" />
                <RHFTextField name="status" label="Status" />
                <RHFTextField name="desc" label="Description" />
                <RHFTextField name="slug" label="Slug" />

                <Controller
                  name="from"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      label="From Date"
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
                  name="to"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      label="To Date"
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
              </Box>
            </Stack>
          </Card>
        </Grid>

        <Grid
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            textAlign: 'center',
            marginLeft: '50px',
          }}
        >
          <Stack direction="row" spacing={2} sx={{ mt: 0 }}>
            <Stack alignItems="flex-end">
              <LoadingButton type="button" variant="outlined" onClick={() => reset()}>
                Reset
              </LoadingButton>
            </Stack>
            <Stack>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {currentOccasion ? 'Update Occassion' : 'Create Design'}
              </LoadingButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

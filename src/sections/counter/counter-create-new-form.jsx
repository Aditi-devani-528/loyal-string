import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect } from 'react';
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
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import { useGetCompany } from 'src/api/company';
import { useGetBranch } from 'src/api/branch';
import axios from 'axios';

// ----------------------------------------------------------------------

const FINANCIAL_YEARS = ['2023-2024', '2024-2025', '2025-2026', '2026-2027', '2027-2028', '2028-2029', '2029-2030', '2030-2031', '2031-2032'];

export default function CounterCreateNewForm({ currentCounter }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const [includeTaxes, setIncludeTaxes] = useState(false);

  const { company } = useGetCompany();
  const companyOptions = company.map((item) => ({
    name: item.name,
    id: item._id,
  }));

  const handleCompanySelect = (event, selectedCompany) => {
    setValue('company', selectedCompany);
  };

  const { branch } = useGetBranch();
  const branchOptions = branch.map((item) => ({
    name: item.name,
    id: item._id,
  }));

  const handleBranchSelect = (event, selectedBranch) => {
    setValue('branch', selectedBranch);
  };

  const NewCounterSchema = Yup.object().shape({

    company: Yup.object().shape({
      name: Yup.string().required('Company name is required'),
      id: Yup.string().required('Company id is required'),
    }).required('Company is required'),

    branch: Yup.object().shape({
      name: Yup.string().required('Branch name is required'),
      id: Yup.string().required('Branch id is required'),
    }).required('Branch is required'),

    name: Yup.string().required('Counter Name is required'),
    counter_number: Yup.string().required('Counter Number is required'),
    desc: Yup.string().required('Counter Description is required'),
    financial_year: Yup.string().required('Financial Year is required'),
  });

  const defaultValues = useMemo(
    () => ({
      company: currentCounter?.company || null,
      branch: currentCounter?.branch || null,
      name: currentCounter?.name || '',
      counter_number: currentCounter?.counter_number || '',
      desc: currentCounter?.desc || '',
      financial_year: currentCounter?.financial_year || '',
    }),
    [currentCounter]
  );

  const methods = useForm({
    resolver: yupResolver(NewCounterSchema),
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
    if (currentCounter) {
      reset(defaultValues);
    }
  }, [currentCounter, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentCounter?.taxes || 0);
    }
  }, [currentCounter?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const counterPayload = {
        company: data.company.id,
        branch: data.branch.id,
        name: data.name,
        counter_number: data.counter_number,
        desc: data.desc,
        financial_year: data.financial_year,
      };

      const url = currentCounter
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/counter/${currentCounter._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/counter`;

      const method = currentCounter ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: counterPayload,
        headers: { 'Content-Type': 'application/json' },
      });

      enqueueSnackbar(response?.data?.message || 'Counter saved successfully!', {
        variant: 'success',
      });
      router.push(paths.dashboard.userMaster.counter);
    } catch (error) {
      console.error('Error saving counter:', error);
      enqueueSnackbar('Something went wrong. Please try again.', { variant: 'error' });
    }
  });


  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {mdUp && (
          <Grid md={4}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {currentCounter ? 'Edit Counter' : 'Add New Counter'}
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
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFAutocomplete
                  name="company"
                  placeholder="Company ID"
                  fullWidth
                  options={companyOptions}
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
                  placeholder="Branch ID"
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

                <RHFTextField name="name" label="Counter Name" />
                <RHFTextField name="counter_number" label="Counter Number" />
                <RHFTextField name="desc" label="Counter Description" />
                <RHFAutocomplete
                  name="financial_year"
                  label="Financial Year"
                  fullWidth
                  options={FINANCIAL_YEARS}
                  getOptionLabel={(option) => option}
                />
              </Box>
            </Stack>
          </Card>
        </Grid>

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
                {currentCounter ? 'Update Counter' : 'Create Counter'}
              </LoadingButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

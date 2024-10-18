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
import { _tags } from 'src/_mock';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { useGetCompany } from 'src/api/company';
import { useGetBranch } from 'src/api/branch';
import { useAuthContext } from 'src/auth/hooks';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function CollectionCreateNewForm({ currentCollection }) {
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

  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const [includeTaxes, setIncludeTaxes] = useState(false);

  const CollectionSchema = Yup.object().shape({
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
    status: Yup.string().required('Status is required'),
    desc: Yup.string().required('Desc is required'),
    slug: Yup.string().required('Slug is required'),
  });

  const defaultValues = useMemo(
    () => ({
      company: currentCollection?.company || null,
      branch: currentCollection?.branch || null,
      name: currentCollection?.name || '',
      status: currentCollection?.status || '',
      desc: currentCollection?.desc || '',
      slug: currentCollection?.slug || '',
    }),
    [currentCollection]
  );

  const methods = useForm({
    resolver: yupResolver(CollectionSchema),
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
    if (currentCollection) {
      reset(defaultValues);
    }
  }, [currentCollection, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentCollection?.taxes || 0);
    }
  }, [currentCollection?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const collectionPayload = {
        company: data.company.id,
        branch: data.branch.id,
        name: data.name,
        status: data.status,
        desc: data.desc,
        slug: data.slug,
      };

      // Determine URL and method based on create/update action
      const url = currentCollection
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/collection/${currentCollection._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/collection`;

      const method = currentCollection ? 'put' : 'post';

      //  API request
      const response = await axios({
        method,
        url,
        data: collectionPayload,
        headers: { 'Content-Type': 'application/json' },
      });

      enqueueSnackbar(response?.data?.message || 'Collection saved successfully!', {
        variant: 'success',
      });
      router.push(paths.dashboard.productMaster.collection);
    } catch (error) {
      console.error('Error saving collection:', error);
      enqueueSnackbar('Something went wrong. Please try again.', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {mdUp && (
          <Grid md={4}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {currentCollection ? 'Edit Collection' : 'Add New Collection'}
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
              </Box>
            </Stack>
          </Card>
        </Grid>

        {mdUp && <Grid md={4} />}
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
                {currentCollection ? 'Update Collection' : 'Create Collection'}
              </LoadingButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

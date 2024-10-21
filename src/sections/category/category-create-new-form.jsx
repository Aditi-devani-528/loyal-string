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

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';
import axios from 'axios';
import { useAuthContext } from '../../auth/hooks';

export default function CategoryCreateNewForm({ currentCategory }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const [includeTaxes, setIncludeTaxes] = useState(false);

  // Form validation schema
  const CategorySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    desc: Yup.string().required('Description is required'),
    short_name: Yup.string().required('Short name is required'),
    parent_category: Yup.string().required('Parent category is required'),
    slug: Yup.string().required('Slug is required'),
    hsn: Yup.string().required('HSN code is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCategory?.name || '',
      desc: currentCategory?.desc || '',
      short_name: currentCategory?.short_name || '',
      parent_category: currentCategory?.parent_category || '',
      slug: currentCategory?.slug || '',
      hsn: currentCategory?.hsn || '',
    }),
    [currentCategory],
  );

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
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
    if (currentCategory) {
      reset(defaultValues);
    }
  }, [currentCategory, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentCategory?.taxes || 0);
    }
  }, [currentCategory?.taxes, includeTaxes, setValue]);

  // Handle form submission
  const onSubmit = handleSubmit(async (data) => {
    try {
      const categoryPayload = {
        name: data.name,
        desc: data.desc,
        short_name: data.short_name,
        parent_category: data.parent_category,
        slug: data.slug,
        hsn: data.hsn,
      };

      const url = currentCategory
        ? `https://gold-erp.onrender.com/api/company/${user?.company}/category/${currentCategory._id}`
        : `https://gold-erp.onrender.com/api/company/${user?.company}/category`;

      const method = currentCategory ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: categoryPayload,
        headers: { 'Content-Type': 'application/json' },
      });

      enqueueSnackbar(response?.data?.message || 'Category saved successfully!', {
        variant: 'success',
      });
      router.push(paths.dashboard.productMaster.category);
    } catch (error) {
      console.error('Error saving category:', error);
      enqueueSnackbar('Something went wrong. Please try again.', { variant: 'error' });
    }
  });

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant='h6' sx={{ mb: 0.5 }}>
            {currentCategory ? 'Edit Category' : 'Add New Category'}
          </Typography>
        </Grid>
      )}

      <Grid xs={12}>
        <Card>
          {!mdUp && <CardHeader title='Details' />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display='grid'
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name='name' label='Category Name' />
              <RHFTextField name='desc' label='Description' />
              <RHFTextField name='short_name' label='Short Name' />
              <RHFAutocomplete
                name='parent_category'
                placeholder='Parent Category'
                fullWidth
                options={['Metal', 'Non-Metal']}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              />
              <RHFTextField name='slug' label='Slug' />
              <RHFTextField name='hsn' label='HSN Code' />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label='Publish'
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

            <Stack alignItems='flex-end' sx={{ mt: 3 }}>
              <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                {currentCategory ? 'Update Category' : 'Create Category'}
              </LoadingButton>
            </Stack>
          </Stack>
        </Grid>

      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}

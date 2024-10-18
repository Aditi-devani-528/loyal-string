import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
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
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import axios from 'axios';
import { useGetCategory } from 'src/api/category';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

// ----------------------------------------------------------------------

export default function ProductsCreateNewForm({ currentProduct }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const [includeTaxes, setIncludeTaxes] = useState(false);

  const { category } = useGetCategory();
  const categoryOptions = category.map((item) => ({
    name: item.name,
    id: item._id,
  }));

  const handleCategorySelect = (event, selectedCategory) => {
    setValue('category', selectedCategory);
  };

  const NewProductSchema = Yup.object().shape({
    category: Yup.object().shape({
      name: Yup.string().required('Category name is required'),
      id: Yup.string().required('Category id is required'),
    }).required('Category is required'),

    name: Yup.string().required('Product Name is required'),
    short_name: Yup.string().required('Short Name is required'),
    desc: Yup.string().required('Description is required'),
    slug: Yup.string().required('Slug is required'),
  });

  const defaultValues = useMemo(
    () => ({
      category: currentProduct?.category || null,
      name: currentProduct?.name || '',
      short_name: currentProduct?.short_name || '',
      desc: currentProduct?.desc || '',
      slug: currentProduct?.slug || '',
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
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
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentProduct?.taxes || 0);
    }
  }, [currentProduct?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const productPayload = {
        category: data.category.id,
        name: data.name,
        short_name: data.short_name,
        desc: data.desc,
        slug: data.slug,
      };

      const url = currentProduct
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/product/${currentProduct._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/product`;

      const method = currentProduct ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: productPayload,
        headers: { 'Content-Type': 'application/json' },
      });

      enqueueSnackbar(response?.data?.message || 'Product saved successfully!', {
        variant: 'success',
      });
      router.push(paths.dashboard.productMaster.products);
    } catch (error) {
      console.error('Error saving product:', error);
      enqueueSnackbar('Something went wrong. Please try again.', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {mdUp && (
          <Grid md={4}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {currentProduct ? 'Edit Product' : 'Add New Product'}
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
                  sm: 'repeat(3, 1fr)',
                }}
              >
                <RHFAutocomplete
                  name="category"
                  placeholder="Category"
                  fullWidth
                  options={categoryOptions}
                  getOptionLabel={(option) => option.name}
                  onChange={handleCategorySelect}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  )}
                />
                <RHFTextField name="name" label="Product Name" />
                <RHFTextField name="short_name" label="Short Name" />
                <RHFTextField name="desc" label="Descripition" />
                <RHFTextField name="slug" label="Slug" />
              </Box>
            </Stack>
          </Card>
        </Grid>

        {mdUp && <Grid md={4} />}
        <Grid xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
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
                  onClick={() => handleSubmit()}
                >
                  {currentProduct ? 'Update Product' : 'Create Product'}
                </LoadingButton>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

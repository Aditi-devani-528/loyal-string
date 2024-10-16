import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import {
  _tags,
  PRODUCT_SIZE_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_COLOR_NAME_OPTIONS,
  PRODUCT_CATEGORY_GROUP_OPTIONS,
} from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFEditor,
  RHFUpload,
  RHFSwitch,
  RHFTextField,
  RHFMultiSelect,
  RHFAutocomplete,
  RHFMultiCheckbox,
} from 'src/components/hook-form';
import { countries } from 'src/assets/data';
import { Button } from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import axios from 'axios';
import { useGetCategory } from 'src/api/category';

// ----------------------------------------------------------------------

export default function ProductsCreateNewForm({ currentProduct }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const [includeTaxes, setIncludeTaxes] = useState(false);

  // category
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

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', []);
  }, [setValue]);

  const handleChangeIncludeTaxes = useCallback((event) => {
    setIncludeTaxes(event.target.checked);
  }, [])

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
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                }}
              >
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
                <RHFTextField name="name" label="Product Name" />
                <RHFTextField name="short_name" label="Short Name" />
                <RHFTextField name="desc" label="Descripition" />
                <RHFTextField name="slug" label="Slug" />
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
                {currentProduct ? 'Update Product' : 'Create Product'}
              </LoadingButton>
            </Stack>
          </Stack>


        </Grid>
      </Grid>
    </FormProvider>
  );
}

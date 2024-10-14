import * as Yup from 'yup';
import PropTypes from 'prop-types';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { _tags } from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import { LoadingButton } from '@mui/lab';
import { countries } from 'src/assets/data';

import axios from 'axios';
import { useAuthContext } from '../../auth/hooks';

import { useGetCategory } from '../../api/category';
import { useGetProductMaster } from 'src/api/productmaster';

// ----------------------------------------------------------------------

export default function DesignCreateNewForm({ currentDesign }) {
  const router = useRouter();

  const { user } = useAuthContext();

  // category
  const { category } = useGetCategory();
  const categoryOptions = category.map((item) => ({
    name: item.name,
    id: item._id,
  }));

  const { product } = useGetProductMaster();
  const productOptions = product.map((item) => ({
    name: item.name,
    id: item._id,
  }));

  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const [includeTaxes, setIncludeTaxes] = useState(false);

  // Yup validation schema
  const DesignSchema = Yup.object().shape({
    category: Yup.object()
      .shape({
        name: Yup.string().required('Category name is required'),
        id: Yup.string().required('Category id is required'),
      })
      .required('Category is required'),

    product: Yup.object()
      .shape({
        name: Yup.string().required('Product name is required'),
        id: Yup.string().required('Product id is required'),
      })
      .required('Product is required'),

    name: Yup.string().required('design Name is required'),
    desc: Yup.string().required('Description is required'),
    slug: Yup.string().required('slug is required'),
    label: Yup.string().required('label is required'),
    min_qty: Yup.string().required('Min Quantity is required'),
    min_wt: Yup.string().required('Min Weight is required'),
  });

  const defaultValues = useMemo(
    () => ({
      category: currentDesign?.category || null,
      product: currentDesign?.product || null,
      name: currentDesign?.name || '',
      desc: currentDesign?.desc || '',
      slug: currentDesign?.slug || '',
      label: currentDesign?.label || '',
      min_qty: currentDesign?.min_qty || '',
      min_wt: currentDesign?.min_wt || [],
    }),
    [currentDesign]
  );

  const methods = useForm({
    resolver: yupResolver(DesignSchema),
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
    if (currentDesign) {
      reset(defaultValues);
    }
  }, [currentDesign, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentDesign?.taxes || 0);
    }
  }, [currentDesign?.taxes, includeTaxes, setValue]);

  // Handle form submission
  const onSubmit = handleSubmit(async (data) => {
    try {
      // Create payload for the API
      const designPayload = {
        category: data.category.id,
        product: data.product.id,
        name: data.name,
        desc: data.desc,
        slug: data.slug,
        label: data.label,
        min_qty: data.min_qty,
        min_wt: data.min_wt,
      };

      // Determine URL and method based on create/update action
      const url = currentDesign
        ? `https://gold-erp.onrender.com/api/company/${user?.company}/design/${currentDesign._id}`
        : `https://gold-erp.onrender.com/api/company/${user?.company}/design`;

      const method = currentDesign ? 'put' : 'post';

      // API request
      const response = await axios({
        method,
        url,
        data: designPayload,
        headers: { 'Content-Type': 'application/json' },
      });

      enqueueSnackbar(response?.data?.message || 'Design saved successfully!', {
        variant: 'success',
      });
      router.push(paths.dashboard.productMaster.design);
    } catch (error) {
      console.error('Error saving design:', error);
      enqueueSnackbar('Something went wrong. Please try again.', { variant: 'error' });
    }
  });

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
  }, []);

  const handleCategorySelect = (event, selectedCategory) => {
    setValue('category', selectedCategory);
  };

  const handleProductSelect = (event, selectedProduct) => {
    setValue('product', selectedProduct);
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {mdUp && (
          <Grid md={12}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {currentDesign ? 'Edit design' : 'Add New Design'}
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

                <RHFAutocomplete
                  name="product"
                  placeholder="Product"
                  fullWidth
                  options={productOptions}
                  getOptionLabel={(option) => option.name}
                  onChange={handleProductSelect}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  )}
                />

                <RHFTextField name="name" label="Design Name" />
                <RHFTextField name="desc" label="Description" />
                <RHFTextField name="slug" label="Slug" />
                <RHFTextField name="label" label="Label" />
                <RHFTextField name="min_qty" label="Min Quantity" />
                <RHFTextField name="min_wt" label="Min Weight" />
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
          <Stack>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {currentDesign ? 'Update Design' : 'Create Design'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
    
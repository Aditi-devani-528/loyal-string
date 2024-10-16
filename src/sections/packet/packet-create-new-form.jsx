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
import { useGetCategory } from '../../api/category';
import { useGetCompany } from '../../api/company';
import { useGetBranch } from '../../api/branch';
import { useGetProduct } from '../../api/product';
import { useGetDesign } from '../../api/design';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function PacketCreateNewForm({ currentPacket }) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { category } = useGetCategory();
  const categoryOptions = category.map((item) => ({
    name: item.name,
    id: item._id,
  }));
  const { company } = useGetCompany();
  const companyOptions = company.map((item) => ({
    name: item.name,
    id: item._id,
  }));
  const { branch } = useGetBranch();
  const branchOptions = branch.map((item) => ({
    name: item.name,
    id: item._id,
  }));
  // const { product } = useGetProduct();
  // const productOptions = product.map((item) => ({
  //   name: item.name,
  //   id: item._id,
  // }));
  const { design } = useGetDesign();
  const DesignOptions = design.map((item) => ({
    name: item.name,
    id: item._id,
  }));

  const { enqueueSnackbar } = useSnackbar();

  const [includeTaxes, setIncludeTaxes] = useState(false);

  const PacketSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    images: Yup.array().min(1, 'Images is required'),
    tags: Yup.array().min(2, 'Must have at least 2 tags'),
    category: Yup.string().required('Category is required'),
    price: Yup.number().moreThan(0, 'Price should not be $0.00'),
    description: Yup.string().required('Description is required'),
    taxes: Yup.number(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentPacket?.name || '',
      description: currentPacket?.description || '',
      subDescription: currentPacket?.subDescription || '',
      images: currentPacket?.images || [],
      //
      code: currentPacket?.code || '',
      sku: currentPacket?.sku || '',
      price: currentPacket?.price || '',
      quantity: currentPacket?.quantity || '',
      priceSale: currentPacket?.priceSale || '',
      taxes: currentPacket?.taxes || '',
      gender: currentPacket?.gender || '',
      category: currentPacket?.category || '',
      colors: currentPacket?.colors || [],
      sizes: currentPacket?.sizes || [],
    }),
    [currentPacket]
  );

  const methods = useForm({
    resolver: yupResolver(PacketSchema),
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
    if (currentPacket) {
      reset(defaultValues);
    }
  565  }, [currentPacket, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentPacket?.taxes || 0);
    }
  }, [currentPacket?.taxes, includeTaxes, setValue]);

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
      router.push('/dashboard/productMaster/packet');
    } catch (error) {
      console.error('Error saving purity:', error);
      enqueueSnackbar('Something went wrong. Please try again.', {
        variant: 'error',
      });
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
  }, []);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Add New Packet
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
              <RHFAutocomplete
                name="category"
                placeholder="Category"
                fullWidth
                options={categoryOptions}
                getOptionLabel={(option) => option.name} // Show category nam// Call handleCategorySelect on change
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
              />
              <RHFAutocomplete
                name="company"
                placeholder="company"
                fullWidth
                options={categoryOptions}
                getOptionLabel={(option) => option.name} // Show category nam// Call handleCategorySelect on change
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
              />
              <RHFAutocomplete
                name="branch"
                type="country"
                // label="Company ID"
                placeholder="branch"
                fullWidth
                options={countries.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />
              <RHFAutocomplete
                name="product"
                type="country"
                // label="Company ID"
                placeholder="Product"
                fullWidth
                options={countries.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />
              <RHFAutocomplete
                name="design"
                type="country"
                // label="Company ID"
                placeholder="design"
                fullWidth
                options={countries.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />
              <RHFAutocomplete
                name="sku"
                type="country"
                // label="Company ID"
                placeholder="SKU"
                fullWidth
                options={countries.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />

              <RHFTextField name="name" label="Packet Name" />
              <RHFTextField name="emptyWeight" label="Empty Weight" />
              <RHFTextField name="desc" label="Description" />
              <RHFTextField name="status" label="Status" />
              <RHFAutocomplete
                name="box"
                type="country"
                // label="Company ID"
                placeholder="box"
                fullWidth
                options={countries.map((option) => option.label)}
                getOptionLabel={(option) => option}
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
            {currentPacket ? 'Update Purity' : 'Create Purity'}
          </LoadingButton>
        </Stack>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {/* {renderProperties} */}

        {/* {renderPricing} */}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}

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
import { useAuthContext } from '../../auth/hooks';
import axios from 'axios';
import { useGetCompany } from '../../api/company';
import { useGetBranch } from '../../api/branch';
import { useGetCategory } from '../../api/category';
import { useGetProductMaster } from '../../api/productmaster';

// ----------------------------------------------------------------------

export default function BoxCreateNewForm({ currentBox }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const { company } = useGetCompany();
  const { branch } = useGetBranch();
  const { category } = useGetCategory();
  const {  product } = useGetProductMaster();

  const companyOptions = company.map((item) => ({
    name: item.name,
    id: item._id,
  }));
  const branchOptions = branch.map((item) => ({
    name: item.name,
    id: item._id,
  }));
  const categoryOptions = category.map((item) => ({
    name: item.name,
    id: item._id,
  }));
  const productOptions = product.map((item) => ({
    name: item.name,
    id: item._id,
  }));
  const { enqueueSnackbar } = useSnackbar();
  const [includeTaxes, setIncludeTaxes] = useState(false);

  const mdUp = useResponsive('up', 'md');


  const NewBoxSchema = Yup.object().shape({
    company: Yup.mixed().required('company is required'),
    branch: Yup.mixed().required('branch is required'),
    category: Yup.mixed().required('Category is required'),
    product: Yup.mixed().required('product is required'),
    name: Yup.string().required('name is required'),
    emptyWeight: Yup.number().moreThan(0, 'emptyWeight should not be $0.00'),
    desc: Yup.string().required('Description is required'),
    status: Yup.string().required('status is required'),
    // packetMaster: Yup.string().required('packetMaster is required'),

  });

  const defaultValues = useMemo(
    () => ({
      company: currentBox?.company || null,
      branch: currentBox?.branch || null,
      category: currentBox?.category || null,
      product: currentBox?.product || null,
      name: currentBox?.name || '',
      emptyWeight: currentBox?.emptyWeight || '',
      desc: currentBox?.desc || '',
      status: currentBox?.status || '',
      // packetMaster: currentBox?.packetMaster || '',
    }),
    [currentBox],
  );

  const methods = useForm({
    resolver: yupResolver(NewBoxSchema),
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
    if (currentBox) {
      reset(defaultValues);
    }
  }, [currentBox, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentBox?.taxes || 0);
    }
  }, [currentBox?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const boxPayload = {
      company: data.company.id,
      branch: data.branch.id,
      category: data.category.id,
      product: data.product.id,
      name: data.name,
      emptyWeight: data.emptyWeight,
      desc: data.desc,
      status: data.status,
      packetMaster: data.packetMaster,
    };
    console.log(boxPayload);

    try {
      const url = currentBox
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/box/${currentBox?._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/box`;

      const method = currentBox ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: boxPayload,
      });
      reset();
      enqueueSnackbar(currentBox ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.productMaster.box);
    } catch (error) {
      console.error('API Error:', error);
      enqueueSnackbar('Failed to save the branch. Try again!', { variant: 'error' });
    }
  });

  const handleCompanySelect = (event, selectedCompany) => {
    setValue('company', selectedCompany);
  };
  const handleBranchSelect = (event, selectedBranch) => {
    setValue('branch', selectedBranch);
  };
  const handleCategorySelect = (event, selectedCategory) => {
    setValue('category', selectedCategory);
  };
  const handleProductSelect = (event, selectedProduct) => {
    setValue('product', selectedProduct);
  };

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
          Add New Box
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
                placeholder="Company"
                fullWidth
                options={companyOptions}
                getOptionLabel={(option) => option.name} // Show category name
                onChange={handleCompanySelect} // Call handleCategorySelect on change
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
              />
              <RHFAutocomplete
                name="branch"
                placeholder="Branch"
                fullWidth
                options={branchOptions}
                getOptionLabel={(option) => option.name} // Show category name
                onChange={handleBranchSelect} // Call handleCategorySelect on change
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
              />
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
              <RHFAutocomplete
                name="product"
                placeholder="Product"
                fullWidth
                options={productOptions}
                getOptionLabel={(option) => option.name} // Show category name
                onChange={handleProductSelect} // Call handleCategorySelect on change
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
              />
               <RHFTextField name="name" label="Box Name" />
               <RHFTextField name="emptyWeight" label="Empty Weight" />
               <RHFTextField name="desc" label="Description" />
              <RHFAutocomplete
                name='status'
                placeholder='status'
                fullWidth
                options={['Active', 'InActive']}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              />
              <RHFAutocomplete
                name='packetMaster'
                placeholder='Packet Master'
                fullWidth
                options={['TestPacket 1- 5','1a5gbfgv4rt5t4t5t4bf','sdghte3235c43ws3sa3']}
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
        {/*
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          {!currentProduct ? 'Submit' : 'Save Changes'}
        </LoadingButton> */}
        <Stack alignItems='flex-end' sx={{ mt: 3 }}>
          <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
            {currentBox ? 'Update Box' : 'Create Box'}
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

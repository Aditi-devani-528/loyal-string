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

// ----------------------------------------------------------------------

export default function PacketCreateNewForm({ currentPacket }) {
  const router = useRouter();
  const { user } = useAuthContext();
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

  const { category } = useGetCategory();
  const categoryOptions = category.map((item) => ({
    name: item.name,
    id: item._id,
  }));

  const handleCategorySelect = (event, selectedCategory) => {
    setValue('category', selectedCategory);
  };

  const { product } = useGetProductMaster();
  const productOptions = product.map((item) => ({
    name: item.name,
    id: item._id,
  }));

  const handleProductSelect = (event, selectedProduct) => {
    setValue('product', selectedProduct);
  };

  const { design } = useGetDesign();
  const designOptions = design.map((item) => ({
    name: item.name,
    id: item._id,
  }));

  const handleDesignSelect = (event, selectedDesign) => {
    setValue('design', selectedDesign);
  };


  const NewPacketSchema = Yup.object().shape({
    company: Yup.object().shape({
      name: Yup.string().required('Company name is required'),
      id: Yup.string().required('Company id is required'),
    }).required('Company is required'),

    branch: Yup.object().shape({
      name: Yup.string().required('Branch name is required'),
      id: Yup.string().required('Branch id is required'),
    }).required('Branch is required'),

    category: Yup.object().shape({
      name: Yup.string().required('Category name is required'),
      id: Yup.string().required('Category id is required'),
    }).required('Category is required'),

    product: Yup.object().shape({
      name: Yup.string().required('Product name is required'),
      id: Yup.string().required('Product id is required'),
    }).required('Product is required'),

    design: Yup.object().shape({
      name: Yup.string().required('Design name is required'),
      id: Yup.string().required('Design id is required'),
    }).required('Design is required'),

    SKU: Yup.string().required('SKU is required'),
    emptyWeight: Yup.string().required('Empty Weight is required'),
    desc: Yup.string().required('Description is required'),
    status: Yup.string().required('Status is required'),
    box: Yup.string().required('Box is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      subDescription: currentProduct?.subDescription || '',
      images: currentProduct?.images || [],
      //
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || 0,
      quantity: currentProduct?.quantity || 0,
      priceSale: currentProduct?.priceSale || 0,
      tags: currentProduct?.tags || [],
      taxes: currentProduct?.taxes || 0,
      gender: currentProduct?.gender || '',
      category: currentProduct?.category || '',
      colors: currentProduct?.colors || [],
      sizes: currentProduct?.sizes || [],
      newLabel: currentProduct?.newLabel || { enabled: false, content: '' },
      saleLabel: currentProduct?.saleLabel || { enabled: false, content: '' },
    }),
    [currentPacket]
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
    if (currentPacket) {
      reset(defaultValues);
    }
  }, [currentPacket, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentProduct?.taxes || 0);
    }
  }, [currentPacket?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentProduct ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.product.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
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
                  name="company"
                  placeholder="Company"
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
                  placeholder="Branch"
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
                <RHFAutocomplete
                  name="design"
                  placeholder="Design"
                  fullWidth
                  options={designOptions}
                  getOptionLabel={(option) => option.name}
                  onChange={handleDesignSelect}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  )}
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
                {/* <RHFTextField name="packetName" label="Packet Name" /> */}
                <RHFTextField name="emptyWeight" label="Empty Weight" />
                <RHFTextField name="desc" label="Description" />

                <RHFAutocomplete
                  name="status"
                  label="Status"
                  placeholder="Select status"
                  options={['Active', 'In ACtive']}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
                  fullWidth
                />


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
                {currentPacket ? 'Update Packet' : 'Create Packet'}
              </LoadingButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

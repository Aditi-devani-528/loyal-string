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
import { countries } from 'src/assets/data';
import { useAuthContext } from 'src/auth/hooks';
import { useGetCategory } from 'src/api/category';
import { useGetProductMaster } from 'src/api/productmaster';
import { useGetDesign } from 'src/api/design';
import { useGetCompany } from 'src/api/company';
import { useGetBranch } from 'src/api/branch';
import { useGetBox } from 'src/api/box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

// ----------------------------------------------------------------------

export default function PacketCreateNewForm({ currentPacket }) {
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

  const { box } = useGetBox();
  const boxOptions = box.map((item) => ({
    name: item.name,
    id: item._id,
  }));

  const handleBoxSelect = (event, selectedBox) => {
    setValue('box', selectedBox);
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

    box: Yup.object().shape({
      name: Yup.string().required('Box name is required'),
      id: Yup.string().required('Box id is required'),
    }).required('Box is required'),
  });

  const defaultValues = useMemo(
    () => ({
      company: currentPacket?.company || null,
      branch: currentPacket?.branch || null,
      category: currentPacket?.category || null,
      product: currentPacket?.product || null,
      design: currentPacket?.design || null,
      SKU: currentPacket?.SKU || null,
      emptyWeight: currentPacket?.emptyWeight || '',
      desc: currentPacket?.desc || '',
      status: currentPacket?.status || '',
      box: currentPacket?.box || null,
    }),
    [currentPacket]
  );

  const methods = useForm({
    resolver: yupResolver(NewPacketSchema),
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
      setValue('taxes', currentPacket?.taxes || 0);
    }
  }, [currentPacket?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const packetPayload = {
        company: data.company,
        branch: data.branch,
        category: data.category,
        product: data.product,
        design: data.design,
        SKU: data.SKU,
        emptyWeight: data.emptyWeight,
        desc: data.desc,
        status: data.status,
        box: data.box,
      };

      const url = currentPacket
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/packet/${currentPacket._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/packet`;

      const method = currentPacket ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: packetPayload,
        headers: { 'Content-Type': 'application/json' },
      });

      enqueueSnackbar(response?.data?.message || 'Packet saved successfully!', {
        variant: 'success',
      });
      router.push(paths.dashboard.productMaster.packet);
    } catch (error) {
      enqueueSnackbar('Something went wrong. Please try again.', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {mdUp && (
          <Grid md={4}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {currentPacket ? 'Edit Packet' : 'Add New Packet'}
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
                  placeholder="Box"
                  fullWidth
                  options={boxOptions}
                  getOptionLabel={(option) => option.name}
                  onChange={handleBoxSelect}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  )}
                />
              </Box>
            </Stack>
          </Card>
        </Grid>

        {mdUp && <Grid md={4} />}
        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'end', gap: 2, alignItems: 'center' }}>
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
                  {currentPacket ? 'Update Packet' : 'Create Packet'}
                </LoadingButton>
              </Stack>
            </Stack>
          </Grid>


        </Grid>
      </Grid>
    </FormProvider>
  );
}

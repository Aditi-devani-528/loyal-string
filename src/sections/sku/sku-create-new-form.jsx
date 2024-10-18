import * as Yup from 'yup';
import { useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { fData } from 'src/utils/format-number';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUploadAvatar, RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { useGetCategory } from '../../api/category';
import { useGetProductMaster } from '../../api/productmaster';
import { useGetDesign } from '../../api/design';

// ----------------------------------------------------------------------

export default function SkuCreateNewForm({ currentUser }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
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

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role is required'),
    zipCode: Yup.string().required('Zip code is required'),
    avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
    status: Yup.string(),
    isVerified: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      city: currentUser?.city || '',
      role: currentUser?.role || '',
      email: currentUser?.email || '',
      state: currentUser?.state || '',
      status: currentUser?.status || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      zipCode: currentUser?.zipCode || '',
      company: currentUser?.company || '',
      avatarUrl: currentUser?.avatarUrl || null,
      phoneNumber: currentUser?.phoneNumber || '',
      isVerified: currentUser?.isVerified || true,
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.user.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Stack>
            <Box sx={{ fontWeight: 'bold', fontSize: '20px', mb: 2 }}>Add New SKU</Box>
          </Stack>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(4, 1fr)',
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
              <RHFTextField name="productRemark" label="Product Remark" />
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

              <RHFTextField name="purity" label="Purity" />
              <RHFTextField name="colour" label="Colour" />
              <RHFTextField name="size" label="Size" />
              <RHFTextField name="gwt" label="G, Wt" />
              <RHFTextField name="totalSt.Wt" label="Total St.Wt" />
              <RHFTextField name="net.Wt" label="Net.Wt" />
              <RHFTextField name="piece" label="Piece" />
              <RHFTextField name="min weight" label="Min weight" />
              <RHFTextField name="minQuantity" label="Min Quantity" />
              <RHFTextField name="Weight Categories" label="Weight Categories" />
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />

              <Stack>
                <Box sx={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
                  Total 0 Weight Categories
                </Box>
              </Stack>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 4 }}>
              <Button type="submit" variant="contained" loading={isSubmitting}>
                Add Weight
              </Button>
            </Stack>
          </Card>
        </Grid>
        <Grid xs={12} md={12}>
          <Stack>
            <Box sx={{ fontWeight: 'bold', fontSize: '20px', mb: 2 }}>Additional Weights</Box>
          </Stack>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name="clipWeight" label="Clip Weight" />
              <RHFTextField name="tagWeight" label="Tag Weight" />
              <RHFTextField name="findingWeight" label="Finding Weight" />
              <RHFTextField name="lanyardWeight" label="Lanyard Weight" />
              <RHFTextField name="otherWeight" label="Other Weight" />
              <RHFTextField name="pouchWeight" label="Pouch Weight" />
              <RHFTextField name="makingPercentage" label="Making Percentage" />
              <RHFTextField name="makingPer/Gram" label="Making Per/Gram" />
              <RHFTextField name="Making Fixed Amount" label="Making Fixed Amount" />
            </Box>
          </Card>
        </Grid>
        <Grid xs={12} md={12}>
          <Stack>
            <Box sx={{ fontWeight: 'bold', fontSize: '20px', mb: 2 }}>Add Stone</Box>
          </Stack>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name="stoneName" label="Stone Name" />
              <RHFTextField name="selectStone" label="Select Stone 💎" />
              <RHFTextField name="stoneWeight" label="Stone Weight" />
              <RHFTextField name="stonePieces" label="Stone Pieces" />
              <RHFTextField name="stoneAmount" label="Stone Amount" />
              <RHFTextField name="stoneDescription" label="Stone Description" />
            </Box>
            <Stack
              sx={{
                mt: 4,
                display: 'flex',
                alignItems: 'flex-end',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: '10px',
              }}
            >
              <Button type="submit" variant="contained" loading={isSubmitting}>
                Remove
              </Button>
              <Button type="submit" variant="contained" loading={isSubmitting}>
                Add Sku
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

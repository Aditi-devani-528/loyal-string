import * as Yup from 'yup';
import { useMemo, useCallback, useState, useEffect } from 'react';
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
import { useGetVendor } from '../../api/vendor';
import { useGetPurity } from '../../api/purity';
import Iconify from '../../components/iconify';
import { Controller } from 'react-hook-form';
import { useGetCollection } from '../../api/collection';

// ----------------------------------------------------------------------

export default function SkuCreateNewForm({ currentUser }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [vendors,setVendors] = useState([])
  const [weight,setWeight] = useState([])
  const [weight2,setWeight2] = useState("")

  const { vendor } = useGetVendor();
  const vendorOptions = vendor.map((item) => ({
    name: item.vendorName,
    id: item._id,
  }));
  const handleVendorSelect = (event, selectedVendor) => {
    setValue('vendor', selectedVendor);
    if (!vendors.map(vendor => vendor.id).includes(selectedVendor.id)) {
      setVendors((prevSelectedVendors) => [
        ...prevSelectedVendors,
        selectedVendor,
      ]);
    }
  };
  const handleRemoveVendor = (id) => {
    setVendors((prevVendors) => prevVendors.filter((vendor) => vendor.id !== id));
  };


  const handleWeightSelect = (event, selectedWeight) => {
    console.log(event.target.value);
    setValue('weightCategory', event.target.value);
    if (!weight.map(item => item).includes(event.target.value)) {
      setWeight2(
        event.target.value
      );
    }
  };
  const handleRemoveWeight = (id) => {
    setWeight((prevWeight) => prevWeight.filter((weight) => weight !== id));
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

  const { collection } = useGetCollection();
  const collectionOptions = collection.map((item) => ({
    name: item.name,
    id: item._id,
  }));
  const handleCollectionSelect = (event, selectedCollection) => {
    setValue('collection', selectedCollection);
  };

  const { purity } = useGetPurity();
  const purityOptions = purity.map((item) => ({
    name: item.name,
    id: item._id,
  }));
  const handlePuritySelect = (event, selectedPurity) => {
    setValue('design', selectedPurity);
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
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    const grossWeight = values.G_Wt;
    const totalStoneWeight = values.total_St_Wt;

    if (grossWeight && totalStoneWeight) {
      const NetWight = grossWeight - totalStoneWeight;
      setValue('net_Wt', NetWight);
    }
  }, [values.totalStoneWeight, values.grossWeight, setValue]);


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
           <Box sx={{display: "flex",justifyContent: "space-between",alignItems: "center",marginBottom: "20px"}}>
             <RHFTextField name="SKUName" label="SKU" sx={{width: "300px"}} />
             <RHFAutocomplete
               name="vendor"
               placeholder="Select Vendor"
               options={vendorOptions}
               getOptionLabel={(option) => option.name}
               onChange={handleVendorSelect}
               renderOption={(props, option) => (
                 <li {...props} key={option.id}>
                   {option.name}
                 </li>
               )}
               sx={{width: "300px"}}
             />
           </Box>
          </Stack>

          <Box sx={{marginBottom: "20px"}}>
            {vendors.map((item, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  marginRight: '10px',
                  padding: '10px',
                  backgroundColor: '#ffffff', // Background color for each vendor item
                  borderRadius: '5px', // Optional: Add rounded corners
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' // Optional: Add shadow for depth
                }}
              >
              {item.name}
                <button
                  onClick={() => handleRemoveVendor(item.id)}
                  style={{
                    marginLeft: '5px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
            <Iconify icon="basil:cross-outline" />
          </button>
        </span>
            ))}
          </Box>

         <Box sx={{display: "flex", justifyContent: "start",padding: "20px"}}>
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
         </Box>

          <Card sx={{ p: 3 }}>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat( 3, 1fr)',
              }}
            >
              <RHFTextField name="desc" label="Description" />
              <RHFTextField name="productRemark" label="Product Remark" />
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
              <RHFAutocomplete
                name="collection"
                placeholder="Collection"
                fullWidth
                options={collectionOptions}
                getOptionLabel={(option) => option.name}
                onChange={handleCollectionSelect}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
              />

              <RHFAutocomplete
                name="purity"
                placeholder="Purity"
                fullWidth
                options={purityOptions}
                getOptionLabel={(option) => option.name}
                onChange={handlePuritySelect}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
              />

              <RHFTextField name="colour" label="Colour" />
              <RHFTextField name="size" label="Size" />
              <RHFTextField name="G_Wt" label="G, Wt" />
              <RHFTextField name="total_St_Wt" label="Total St.Wt" />
              <RHFTextField name="net_Wt" label="Net.Wt" />
              <RHFTextField name="pieces" label="Piece" />
              <RHFTextField name="minWeight" label="Min weight" />
              <RHFTextField name="minQuantity" label="Min Quantity" />
              <RHFTextField onChange={handleWeightSelect} name="weightCategory" label="Weight Categories"  />



            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 4 }}>
              <Button type="submit" variant="contained" onClick={() => {
                if(weight2 !== ""){
                setWeight((data) => [...data, weight2]);
                }
                setWeight2("")
              }}>
                Add Weight
              </Button>
            </Stack>
            <Box sx={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
              Total 0 Weight Categories
            </Box>
              <Box sx={{marginBottom: "20px"}}>
                {weight.map((item, index) => (
                  <span
                    key={index}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      marginRight: '10px',
                      padding: '10px',
                      backgroundColor: '#ffffff', // Background color for each vendor item
                      borderRadius: '5px', // Optional: Add rounded corners
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' // Optional: Add shadow for depth
                    }}
                  >
              {item}
                    <button
                      onClick={() => handleRemoveWeight(item)}
                      style={{
                        marginLeft: '5px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
            <Iconify icon="basil:cross-outline" />
          </button>
        </span>
                ))}
              </Box>
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
              <RHFTextField name="makingPer" label="Making Percentage" />
              <RHFTextField name="makingPerGram" label="Making Per/Gram" />
              <RHFTextField name="makingFixedAmount" label="Making Fixed Amount" />
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
              <Button type="reset" variant="contained" loading={isSubmitting}>
                Remove
              </Button>
              <Button type="submit" variant="contained" loading={isSubmitting}>
                Add Stone
              </Button>

            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

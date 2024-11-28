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
import { useGetRate } from '../../api/rate';
import { useGetStone } from '../../api/stone';
import log from 'eslint-plugin-react/lib/util/log';



// ----------------------------------------------------------------------

export default function SkuCreateNewForm({ currentUser }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [vendors, setVendors] = useState([]);
  const [weight, setWeight] = useState([]);
  const [weight2, setWeight2] = useState('');
  const [stones, setStones] = useState([]);

  // Inside the component
  const [totalStoneAmount, setTotalStoneAmount] = useState(0);

// Recalculate total stone amount whenever `stones` changes
  useEffect(() => {
    const total = stones.reduce((sum, stone) => sum + parseFloat(stone.stoneAmount || 0), 0);
    setTotalStoneAmount(total);
  }, [stones]);

  const handleAddStoneClick = () => {
    setStones([
      ...stones,
      {
        stoneName: '',
        stoneWeight: '',
        stonePieces: '',
        stoneAmount: '',
        stoneDescription: '',
      },
    ]);
  };


  const handleRemoveStoneClick = (index) => {
    setStones(stones.filter((_, idx) => idx !== index));
  };

  const [diamonds, setDiamonds] = useState([]);

  const handleAddDiamondClick = () => {
    setDiamonds([...diamonds, {
      id: Date.now(),
      diamondName: '',
      diamondShape: '',
      diamondClarity: '',
      diamondColour: '',
      diamondSize: '',
      diamondSieve: '',
      diamondWeight: '',
      diamondRate: '',
      diamondPieces: '',
      diamondCut: '',
      settingType: '',
      certificate: '',
      description: '',
    }]);
  };

  const handleRemoveDiamondClick = (id) => {
    setDiamonds(diamonds.filter((diamond) => diamond.id !== id));
  };

  const { rate, mutate } = useGetRate();
  const [filteredPurityOptions, setFilteredPurityOptions] = useState([]);
  const todayRate = rate.filter((date) => {
    new Date(date.createdAt).toDateString() == new Date().toDateString();
  });

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
        event.target.value,
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
  const handleCategoryChange = (event, value) => {
    setValue('category', value);
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


  const handlePuritySelect = (event, selectedPurity) => {
    setValue('purity', selectedPurity);
  };

  const { stone } = useGetStone();
  const stoneOptions = stone.map((item) => ({
    name: item.name,
    id: item._id,
    item: item,
  }));
  const handleStoneSelect = (event, selectedStone) => {
    setValue('stone', selectedStone);
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
    [currentUser],
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

  const { purity } = useGetPurity();
  const livecategory = watch('category');
  const purityOptions = purity?.filter((e) => e?.category?._id === livecategory?.id).map((item) => (
    {
      name: item.name,
      id: item._id,
      categoryId: item.category._id,
      item: item,
    }
  ));

  useEffect(() => {
    const netWeight = parseFloat(values.net_Wt) || 0;
    const todaysRate = parseFloat(values.todaysRate) || 0;

    if (netWeight > 0 && todaysRate > 0) {
      const metalAmount = netWeight * todaysRate;
      setValue('metalAmount', metalAmount.toFixed(2)); // Update metalAmount
    }
  }, [values.net_Wt, values.todaysRate, setValue]);

  useEffect(() => {
    const stoneDetails = watch('stoneName');
    console.log(stoneDetails);
    if (stoneDetails) {
      setValue('stoneWeight', stoneDetails.item);
    }

  }, [watch('stoneName')]);


  // useEffect(() => {
  //
  //
  // },[watch('stoneAmount')])

  // useEffect(() => {
  //   const grossWeight = values.G_Wt;
  //   const totalStoneWeight = values.total_St_Wt;
  //
  //   if (grossWeight && totalStoneWeight) {
  //     const NetWight = grossWeight - totalStoneWeight;
  //     setValue('net_Wt', NetWight);
  //   }
  // }, [values.totalStoneWeight, values.grossWeight, setValue]);

  useEffect(() => {
    const grossWeight = watch('G_Wt');
    const totalStoneWeight = watch('total_St_Wt');
    const net = watch('net_Wt');
    const purity = watch('purity');

    if (grossWeight && totalStoneWeight) {
      const NetWeight = grossWeight - totalStoneWeight;

      const formattedNetWeight = NetWeight.toFixed(2);

      setValue('net_Wt', formattedNetWeight);
    }

    if (net && purity) {
      const MetalAmount = parseFloat(net) * parseFloat(purity?.item?.today_rate);

      const formattedMetalAmount = MetalAmount.toFixed(2);

      setValue('metalAmount', formattedMetalAmount);
    }
  }, [watch('total_St_Wt'), watch('G_Wt'), watch('net_Wt'), watch('purity'), setValue]);


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
    [setValue],
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Stack>
            <Box sx={{ fontWeight: 'bold', fontSize: '20px', mb: 2 }}>Add New SKU</Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <RHFTextField name='SKUName' label='SKU' sx={{ width: '300px' }} />
              <RHFAutocomplete
                name='vendor'
                placeholder='Select Vendor'
                options={vendorOptions}
                getOptionLabel={(option) => option.name}
                onChange={handleVendorSelect}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
                sx={{ width: '300px' }}
              />
            </Box>
          </Stack>

          <Box sx={{ marginBottom: '20px' }}>
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
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // Optional: Add shadow for depth
                }}
              >
              {item.name}
                <button
                  onClick={() => handleRemoveVendor(item.id)}
                  style={{
                    marginLeft: '5px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
            <Iconify icon='basil:cross-outline' />
          </button>
        </span>
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'start', padding: '20px' }}>
            <RHFUploadAvatar
              name='avatarUrl'
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant='caption'
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
              display='grid'
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat( 3, 1fr)',
              }}
            >
              <RHFTextField name='desc' label='Description' />
              <RHFTextField name='productRemark' label='Product Remark' />
              <RHFAutocomplete
                name='category'
                placeholder='Category'
                fullWidth
                options={categoryOptions}
                getOptionLabel={(option) => option.name}
                onChange={handleCategoryChange}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
              />
              <RHFAutocomplete
                name='product'
                placeholder='Product'
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
                name='design'
                placeholder='Design'
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
                name='collection'
                placeholder='Collection'
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
                name='purity'
                placeholder='Purity'
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

              <RHFTextField name='colour' label='Colour' />
              <RHFTextField name='size' label='Size' />
              <RHFTextField name='G_Wt' label='G, Wt' />
              <RHFTextField name='total_St_Wt' label='Total St.Wt' />
              <RHFTextField name='net_Wt' label='Net.Wt' />
              <RHFTextField name='pieces' label='Piece' />
              <RHFTextField name='minWeight' label='Min weight' />
              <RHFTextField name='minQuantity' label='Min Quantity' />
              <RHFTextField onChange={handleWeightSelect} name='weightCategory' label='Weight Categories' />

            </Box>

            <Stack alignItems='flex-end' sx={{ mt: 4 }}>
              <Button type='submit' variant='contained' onClick={() => {
                if (weight2 !== '') {
                  setWeight((data) => [...data, weight2]);
                }
                setWeight2('');
              }}>
                Add Weight
              </Button>
            </Stack>
            <Box sx={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
              Total 0 Weight Categories
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
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
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // Optional: Add shadow for depth
                  }}
                >
              {item}
                  <button
                    onClick={() => handleRemoveWeight(item)}
                    style={{
                      marginLeft: '5px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
            <Iconify icon='basil:cross-outline' />
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
              display='grid'
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name='clipWeight' label='Clip Weight' />
              <RHFTextField name='tagWeight' label='Tag Weight' />
              <RHFTextField name='findingWeight' label='Finding Weight' />
              <RHFTextField name='lanyardWeight' label='Lanyard Weight' />
              <RHFTextField name='otherWeight' label='Other Weight' />
              <RHFTextField name='pouchWeight' label='Pouch Weight' />
              <RHFTextField name='makingPer' label='Making Percentage' />
              <RHFTextField name='makingPerGram' label='Making Per/Gram' />
              <RHFTextField name='makingFixedAmount' label='Making Fixed Amount' />
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={12}>
          <Stack>
            <Box sx={{ fontWeight: 'bold', fontSize: '20px', mb: 2 }}>Labour Amount</Box>
          </Stack>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display='grid'
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name='LamourAmount' label='Labour Amount' />
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={12}>
          <Stack>
            <Box sx={{ fontWeight: 'bold', fontSize: '20px', mb: 2 }}>ADD STONES</Box>
          </Stack>

          {stones.map((stone, index) => (
            <Card sx={{ p: 3, mb: 3 }} key={index}>
              <Box
                rowGap={3}
                columnGap={2}
                display='grid'
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(4, 1fr)',
                }}
              >
                <RHFAutocomplete
                  name={`stoneName-${index}`}
                  placeholder='Stone Name'
                  fullWidth
                  options={stoneOptions}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) => {
                    const selectedStone = stoneOptions.find((stone) => stone.name === value?.name);
                    setValue(`stoneWeight-${index}`,value.item.stoneWeight)
                    setValue(`stoneAmount-${index}`,value.item.stoneAmount)
                    setValue(`desc-${index}`,value.item.desc)
                  }}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  )}
                />
                <RHFTextField
                  name={`stoneWeight-${index}`}
                  label='Stone Weight'
                  onChange={(e) =>
                    setStones(
                      stones.map((s, idx) =>
                        idx === index ? { ...s, stoneWeight: e.target.value } : s,
                      ),
                    )
                  }
                />
                <RHFTextField
                  name={`stonePieces-${index}`}
                  label="Stone Pieces"
                  onChange={(e) => {
                    const stonePieces = parseFloat(e.target.value) || 0; // Convert to number
                    const currentStoneAmount = parseFloat(watch(`stoneAmount-${index}`)) || 0; // Get the current value of stoneAmount from the form state

                    const calculatedAmount = stonePieces * currentStoneAmount; // Calculate the new stoneAmount
                    console.log("Calculated Stone Amount:", calculatedAmount);

                    // Update the form values
                    setValue(`stoneAmount-${index}`, calculatedAmount);

                    // Update the state with the new values
                    setStones(
                      stones.map((s, idx) =>
                        idx === index
                          ? {
                            ...s,
                            stonePieces: stonePieces, // Update stonePieces
                            stoneAmount: calculatedAmount, // Update stoneAmount with the new calculation
                          }
                          : s,
                      ),
                    );
                  }}
                />




                <RHFTextField
                  name={`stoneAmount-${index}`}
                  label='Stone Amount'
                  onChange={(e) =>
                    setStones(
                      stones.map((s, idx) =>
                        idx === index ? { ...s, stoneAmount: e.target.value } : s,
                      ),
                    )
                  }
                />
                <RHFTextField
                  name={`desc-${index}`}
                  label='Stone Description'
                  onChange={(e) =>
                    setStones(
                      stones.map((s, idx) =>
                        idx === index ? { ...s, stoneDescription: e.target.value } : s,
                      ),
                    )
                  }
                />
              </Box>
              <Stack
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  type='button'
                  variant='contained'
                  onClick={() => handleRemoveStoneClick(index)}
                >
                  Remove
                </Button>
              </Stack>
            </Card>
          ))}


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
            <Button
              type='button'
              variant='contained'
              onClick={handleAddStoneClick}>Add Stone
            </Button>
          </Stack>
        </Grid>


        <Grid xs={12} md={12}>
          <Stack>
            <Box sx={{ fontWeight: 'bold', fontSize: '20px', mb: 2 }}>ADD DIAMONDS</Box>
          </Stack>

          {diamonds.map((diamond, index) => (
            <Card sx={{ p: 3, mb: 3 }} key={diamond.id}>
              <Box
                rowGap={3}
                columnGap={2}
                display='grid'
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(4, 1fr)',
                }}
              >
                <RHFTextField
                  name={`diamondName-${diamond.id}`}
                  label='Diamond Name'
                  onChange={(e) =>
                    setDiamonds(
                      diamonds.map((d) =>
                        d.id === diamond.id ? { ...d, diamondName: e.target.value } : d,
                      ),
                    )
                  }
                />
                <RHFTextField
                  name={`diamondShape-${diamond.id}`}
                  label='Diamond Shape'
                  onChange={(e) =>
                    setDiamonds(
                      diamonds.map((d) =>
                        d.id === diamond.id ? { ...d, diamondShape: e.target.value } : d,
                      ),
                    )
                  }
                />
                <RHFTextField
                  name={`diamondClarity-${diamond.id}`}
                  label='Diamond Clarity'
                  onChange={(e) =>
                    setDiamonds(
                      diamonds.map((d) =>
                        d.id === diamond.id ? { ...d, diamondClarity: e.target.value } : d,
                      ),
                    )
                  }
                />
                <RHFTextField
                  name={`diamondColour-${diamond.id}`}
                  label='Diamond Colour'
                  onChange={(e) =>
                    setDiamonds(
                      diamonds.map((d) =>
                        d.id === diamond.id ? { ...d, diamondColour: e.target.value } : d,
                      ),
                    )
                  }
                />
                <RHFTextField
                  name={`diamondSize-${diamond.id}`}
                  label='Diamond Size'
                  onChange={(e) =>
                    setDiamonds(
                      diamonds.map((d) =>
                        d.id === diamond.id ? { ...d, diamondSize: e.target.value } : d,
                      ),
                    )
                  }
                />
                <RHFTextField
                  name={`diamondSieve-${diamond.id}`}
                  label='Sieve'
                  onChange={(e) =>
                    setDiamonds(
                      diamonds.map((d) =>
                        d.id === diamond.id ? { ...d, diamondSieve: e.target.value } : d,
                      ),
                    )
                  }
                />
                <RHFTextField
                  name={`diamondWeight-${diamond.id}`}
                  label='Diamond Weight'
                  onChange={(e) =>
                    setDiamonds(
                      diamonds.map((d) =>
                        d.id === diamond.id ? { ...d, diamondWeight: e.target.value } : d,
                      ),
                    )
                  }
                />
                <RHFTextField
                  name={`diamondRate-${diamond.id}`}
                  label='Diamond Rate'
                  onChange={(e) =>
                    setDiamonds(
                      diamonds.map((d) =>
                        d.id === diamond.id ? { ...d, diamondRate: e.target.value } : d,
                      ),
                    )
                  }
                />
                <RHFTextField
                  name={`diamondPieces-${diamond.id}`}
                  label='Diamond Pieces'
                  onChange={(e) =>
                    setDiamonds(
                      diamonds.map((d) =>
                        d.id === diamond.id ? { ...d, diamondPieces: e.target.value } : d,
                      ),
                    )
                  }
                />
                <RHFTextField
                  name={`diamondCut-${diamond.id}`}
                  label='Diamond Cut'
                  onChange={(e) =>
                    setDiamonds(
                      diamonds.map((d) =>
                        d.id === diamond.id ? { ...d, diamondCut: e.target.value } : d,
                      ),
                    )
                  }
                />
                <RHFTextField
                  name={`settingType-${diamond.id}`}
                  label='Setting Type'
                  onChange={(e) =>
                    setDiamonds(
                      diamonds.map((d) =>
                        d.id === diamond.id ? { ...d, settingType: e.target.value } : d,
                      ),
                    )
                  }
                />
                <RHFTextField
                  name={`certificate-${diamond.id}`}
                  label='Certificate'
                  onChange={(e) =>
                    setDiamonds(
                      diamonds.map((d) =>
                        d.id === diamond.id ? { ...d, certificate: e.target.value } : d,
                      ),
                    )
                  }
                />
                <RHFTextField
                  name={`description-${diamond.id}`}
                  label='Description'
                  onChange={(e) =>
                    setDiamonds(
                      diamonds.map((d) =>
                        d.id === diamond.id ? { ...d, description: e.target.value } : d,
                      ),
                    )
                  }
                />
              </Box>
              <Stack
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  type='button'
                  variant='contained'
                  onClick={() => handleRemoveDiamondClick(diamond.id)}
                >
                  Remove
                </Button>
              </Stack>
            </Card>
          ))}

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
            <Button
              type='button'
              variant='contained'
              onClick={handleAddDiamondClick}
            >
              Add Diamonds
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Grid xs={12} md={12}>
        <Card sx={{ p: 3, mt: 5 }}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(4, 1fr)",
            }}
          >
            <div rowGap={3}>
              <span>Metal Amount</span>
              <RHFTextField name="metalAmount" InputProps={{ readOnly: true }} />
            </div>
            <div rowGap={3}>
              <span>Stone Amount</span>
              <RHFTextField
                name="stoneAmount"
                InputProps={{ readOnly: true }}
                value={totalStoneAmount} // Set the calculated total here
              />
            </div>
            <div rowGap={3}>
              <span>Lamour Amount</span>
              <RHFTextField name="LamourAmount" InputProps={{ readOnly: true }} />
            </div>
            <div rowGap={3}>
              <span>Total Amount</span>
              <RHFTextField
                name="totalAmount"
                value={totalStoneAmount} // Optionally include total amounts here too
                onChange={(e) => handleTotalAmountUpdate(e.target.value)} // Update total amount logic if needed
              />
            </div>
          </Box>
          <Stack
            sx={{
              mt: 4,
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <Button type="reset" variant="contained" loading={isSubmitting}>
              Reset
            </Button>
            <Button type="submit" variant="contained" loading={isSubmitting}>
              Submit
            </Button>
          </Stack>
        </Card>
      </Grid>;
    </FormProvider>
  );
}

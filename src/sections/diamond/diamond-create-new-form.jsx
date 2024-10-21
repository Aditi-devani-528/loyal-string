import * as Yup from 'yup';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFAutocomplete,
  RHFTextField,
} from 'src/components/hook-form';
import { useAuthContext } from 'src/auth/hooks';
import axios from 'axios';
import { Container, width } from '@mui/system';
import { Input, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { TableHeadCustom } from 'src/components/table';
import Scrollbar from 'src/components/scrollbar';
import { table } from 'src/theme/overrides/components/table';
import { settings } from 'nprogress';
import { useResponsive } from 'src/hooks/use-responsive';
import { number } from 'prop-types';

// ----------------------------------------------------------------------

const Diamond_Shape = ['TRIANGLE', 'OVAL', 'ROUND', 'CUSHION', 'PRINCESS', 'RADIANT', 'ASSCHER', 'HEART', 'EMERALD', 'PEAR', 'MARQUISE', 'TRILLION', 'BAGUETTE', 'RD', 'MQ', 'PR', 'PE', 'EM', 'BG', 'HRT']
const Diamond_Clarity = ['F', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'I1', 'I2', 'I3', 'S1', 'S2', 'S3', 'V', 'VVS-VS']
const Diamond_Color = ['RED', 'COLORLESS', 'NEAR COLORLESS', 'FAINT', 'VERY LIGHT', 'LIGHT', 'EF']
const Diamond_Cut = ['ROUND CUT', 'RAIDANT BRILLIANT', 'OVAL CUT', 'EMERALD CUT', 'ASSCHER CUT', 'HEART SHAPE CUT', 'CUSION SHAPE CUT', 'SQUARE CUSHION CUT', 'PRINCESS CUT', 'RADIANT CUT', 'TRILLION CUT', 'SHIELD CUT', 'HALF MOON CUT', 'TRIANGLE CUT', 'STRAIGHT TRILLION CUT', 'CURVED TRILLION CUT', 'CALF CUT', 'PEAR CUT', 'MARQUISE CUT', 'BAGUETTE CUT', 'BR/ST', 'BR/ST', 'RC']
const Setting_Type = ['SOLITAIRE', 'CHANNEL', 'BEZEL', 'THREE-STONE', 'PAVE', 'VINTAGE INSPIRED', 'PRONG', 'HALO', 'SPLIT SHANK']

const TABLE_HEAD = [
  { id: 'templateName', label: 'Template Name' },
  { id: 'diamondShape', label: 'Dia Shape' },
  { id: 'diamondClarity', label: 'Dia Clarity' },
  { id: 'diamondColor', label: 'Dia Color' },
  { id: 'size', label: 'Dia Size' },
  { id: 'sieve', label: 'Sieve' },
  { id: 'weight', label: 'Dia Weight' },
  { id: 'purchaseRate', label: 'Dia Purchase Rate' },
  { id: 'sellRate', label: 'Dia Sell Rate' },
];

export default function DiamondCreateNewForm({ currentDiamond }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const [diamondList, setDiamondList] = useState([]);

  // const NewDiamondSchema = Yup.object().shape({
  //   templateName: Yup.mixed().required('Template Name is required'),
  //   diamondShape: Yup.mixed().required('Diamond Shape is required'),
  //   diamondClarity: Yup.mixed().required('Diamond Clarity is required'),
  //   diamondColor: Yup.mixed().required('Diamond Color is required'),
  //   diamondCut: Yup.mixed().required('Diamond Cut is required'),
  //   settingType: Yup.mixed().required('Setting Type is required'),
  //   size: Yup.mixed().required('Size is required'),
  //   sieve: Yup.mixed().required('Sieve is required'),
  //   weight: Yup.number()
  //     .required('Weight is required')
  //     .positive('Weight must be a positive number')
  //     .typeError('Weight must be a number'),
  //   margin: Yup.number()
  //     .required('Margin is required')
  //     .positive('Margin must be a positive number')
  //     .typeError('Margin must be a number'),
  //   purchaseRate: Yup.number()
  //     .required('Purchase Rate is required')
  //     .positive('Purchase Rate must be a positive number')
  //     .typeError('Purchase Rate must be a number'),
  //   sellRate: Yup.number()
  //     .required('Sell Rate is required')
  //     .positive('Sell Rate must be a positive number')
  //     .typeError('Sell Rate must be a number'),
  // });

  const NewDiamondSchema = Yup.object().shape({
    templateName: Yup.string()
      .required('Template Name is required'),

    diamondShape: Yup.string()
      .required('Diamond Shape is required'),

    diamondClarity: Yup.string()
      .required('Diamond Clarity is required'),

    diamondColor: Yup.string()
      .required('Diamond Color is required'),

    diamondCut: Yup.string()
      .required('Diamond Cut is required'),

    settingType: Yup.string()
      .required('Setting Type is required'),

    size: Yup.string()
      .required('Size is required'),

    sieve: Yup.string()
      .required('Sieve is required'),

    weight: Yup.number()
      .required('Weight is required')
      .positive('Weight must be a positive number')
      .typeError('Weight must be a valid number'),

    margin: Yup.number()
      .required('Margin is required')
      .positive('Margin must be a positive number')
      .typeError('Margin must be a valid number'),

    purchaseRate: Yup.number()
      .required('Purchase Rate is required')
      .positive('Purchase Rate must be a positive number')
      .typeError('Purchase Rate must be a valid number'),

    sellRate: Yup.number()
      .required('Sell Rate is required')
      .positive('Sell Rate must be a positive number')
      .typeError('Sell Rate must be a valid number'),
  });


  const defaultValues = useMemo(
    () => ({
      diamondShape: currentDiamond?.diamondShape || '',
      diamondClarity: currentDiamond?.diamondClarity || '',
      diamondColor: currentDiamond?.diamondColor || '',
      diamondCut: currentDiamond?.diamondCut || '',
      settingType: currentDiamond?.settingType || '',
      size: currentDiamond?.size || '',
      sieve: currentDiamond?.sieve || '',
      weight: currentDiamond?.weight || 0,
      margin: currentDiamond?.margin || 0,
      purchaseRate: currentDiamond?.purchaseRate || 0,
      sellRate: currentDiamond?.sellRate || 0,
      templateName: currentDiamond?.templateName || '',
    }),
    [currentDiamond]
  );

  const methods = useForm({
    resolver: yupResolver(NewDiamondSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const onSubmit = handleSubmit(async (data) => {
    console.log('Form Data:', data);
    setDiamondList((prev) => [...prev, data]);
    reset();
  });

  const handleAdd = async () => {
    if (diamondList.length < 1) {
      return enqueueSnackbar('Add Data', { variant: 'error' });
    }
    try {
      const url = currentDiamond
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/diamond/${currentDiamond._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/diamond`;

      const method = currentDiamond ? 'put' : 'post';

      const promises = diamondList.map((diamond) => {
        return axios({
          method,
          url,
          data: diamond,
          headers: { 'Content-Type': 'application/json' },
        });
      });

      const responses = await Promise.all(promises);

      responses.forEach((response) => {
        enqueueSnackbar(response?.data?.message || 'Diamond saved successfully!', {
          variant: 'success',
        });
      });

      router.push(paths.dashboard.productMaster.diamond);
    } catch (error) {
      console.error('Error saving diamonds:', error);
      enqueueSnackbar('Something went wrong. Please try again.', { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit} >
      <Grid container spacing={3}>
        <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Grid sm={6}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {currentDiamond ? 'Edit Diamond' : 'Add New Diamond'}
            </Typography>
          </Grid>
          <Grid sm={3}>
            <RHFTextField name="templateName" label="Template Name" />
          </Grid>
        </Grid>
        <Grid xs={12}>
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
              <RHFAutocomplete
                name="diamondShape"
                label="Select Diamond Shape"
                placeholder='Diamond Shape'
                fullWidth
                options={Diamond_Shape}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="diamondClarity"
                label="Select Diamond Clarity"
                placeholder='Diamond Clarity'
                fullWidth
                options={Diamond_Clarity}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="diamondColor"
                label="Select Diamond Color"
                placeholder='Diamond Color'
                fullWidth
                options={Diamond_Color}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="diamondCut"
                label="Select Diamond Cut"
                placeholder='Diamond Cut'
                fullWidth
                options={Diamond_Cut}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="settingType"
                label="Select Setting Type"
                placeholder='Setting Type'
                fullWidth
                options={Setting_Type}
                getOptionLabel={(option) => option}
              />
            </Box>
          </Card>

          <Card sx={{ p: 3, mt: 5 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >

              <RHFTextField name="size" label="Diamond Size" />
              <RHFTextField name="sieve" label="Sieve" />
              <RHFTextField name="weight" label="Diamond Weight" />
              <RHFTextField name="margin" label="Diamond Margin" />
              <RHFTextField name="purchaseRate" label="Diamond Purchase Rate" />
              <RHFTextField name="sellRate" label="Diamond Sell Rate" />
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: 0, justifyContent: 'space-between', display: 'flex' }}>
              <Stack alignItems="flex-start" sx={{ mt: 4.5 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                >
                  Add
                </LoadingButton>
              </Stack>

              <Grid alignItems="flex-end" sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Stack>
                  <LoadingButton
                    type="button"
                    variant="contained"
                  // onClick={() => handleImport()}
                  >
                    Import
                  </LoadingButton>
                </Stack>
                <Stack alignItems="flex-end">
                  <LoadingButton
                    type="button"
                    variant="contained"
                  // onClick={() => handleDownload()}
                  >
                    Download Sample
                  </LoadingButton>
                </Stack>
              </Grid>
            </Stack>
          </Card>
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

              <Stack alignItems='flex-end' sx={{ mt: 3 }}>
                <LoadingButton onClick={() => handleAdd()} type='button' variant='contained' loading={isSubmitting}>
                  {currentDiamond ? 'Update Diamond' : 'Create Diamond'}
                </LoadingButton>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          <Card sx={{ mt: 10 }}>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Scrollbar>
                <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                  <TableHeadCustom
                    sx={{ whiteSpace: 'nowrap' }}
                    order={table.order}
                    orderBy={table.orderBy}
                    headLabel={TABLE_HEAD}
                    onSort={table.onSort}
                  />
                  <TableBody>
                    {diamondList.map((diamond, index) => (
                      <TableRow key={index}>
                        <TableCell>{diamond.templateName}</TableCell>
                        <TableCell>{diamond.diamondShape}</TableCell>
                        <TableCell>{diamond.diamondClarity}</TableCell>
                        <TableCell>{diamond.diamondColor}</TableCell>
                        <TableCell>{diamond.size}</TableCell>
                        <TableCell>{diamond.sieve}</TableCell>
                        <TableCell>{diamond.weight}</TableCell>
                        <TableCell>{diamond.purchaseRate}</TableCell>
                        <TableCell>{diamond.sellRate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
          </Card>
        </Container>


      </Grid>
    </FormProvider>
  );
}



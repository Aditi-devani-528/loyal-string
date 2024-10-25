import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { Container, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, useTable } from 'src/components/table';
import { useGetPurity } from 'src/api/purity';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'category', label: 'Category' },
  { id: 'purity', label: 'Purity' },
  { id: 'finePercentage', label: 'Fine Percentage' },
  { id: 'todaysRate', label: 'Todays Rate' },
];

export default function RateCreateNewForm({ currentRate }) {
  const router = useRouter();
  const table = useTable();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const { purity } = useGetPurity();

  const [rate, setRate] = useState([currentRate]);

  const NewRateSchema = Yup.object().shape({
    todaysRate: Yup.array()
      .of(Yup.string().required('Today\'s Rate is required'))
      .required('At least one Today\'s Rate is required')
      .min(1, 'At least one Today\'s Rate is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewRateSchema),
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const ratePayload = purity.map((purityItem, index) => ({
        company: user.company,
        category: purityItem.category.name,
        purity: purityItem.name,
        fine_percentage: purityItem.fine_percentage,
        today_rate: data.todaysRate[index],
        created_at: new Date()
      }));

      const Payload = {
        rates: ratePayload,
      };

      const url = currentRate
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/rate/${currentRate._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/rate`;
      const method = currentRate ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: currentRate ? {
          company: user.company,
          category: currentRate.category,
          purity: currentRate.purity,
          fine_percentage: currentRate.fine_percentage,
          today_rate: data.todaysRate[0],
        } : Payload,
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res).catch((err) => console.log(err));

      enqueueSnackbar(response?.data?.message || 'Rate saved successfully!', {
        variant: 'success',
      });
      router.push('/dashboard/productMaster/rate');
    } catch (error) {
      console.error('Error saving Rate:', error);
      enqueueSnackbar('Something went wrong. Please try again.', {
        variant: 'error',
      });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Container>
          <Card sx={{ mt: 3 }}>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Scrollbar>
                <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                  <TableHeadCustom
                    sx={{ whiteSpace: 'nowrap' }}
                    headLabel={TABLE_HEAD}
                  />
                  {currentRate ? <TableBody>
                    {rate.map((purity, index) => (
                      <TableRow key={index}>
                        <TableCell>{purity.category}</TableCell>
                        <TableCell>{purity.purity}</TableCell>
                        <TableCell>{purity.fine_percentage}</TableCell>
                        <TableCell>
                          <RHFTextField name={`todaysRate[${index}]`} defaultValue={purity.today_rate} label="Today's Rate" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                    :
                    <TableBody>
                      {purity.map((purity, index) => (
                        <TableRow key={index}>
                          <TableCell>{purity.category.name}</TableCell>
                          <TableCell>{purity.name}</TableCell>
                          <TableCell>{purity.fine_percentage}</TableCell>
                          <TableCell>
                            <RHFTextField name={`todaysRate[${index}]`} label="Today's Rate" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  }
                </Table>
              </Scrollbar>
            </TableContainer>
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
                  >
                    {currentRate ? 'Update Rate' : 'Create Rate'}
                  </LoadingButton>
                </Stack>
              </Stack>
            </Grid>
          </Card>
        </Container>
      </Grid>
    </FormProvider>
  );
}

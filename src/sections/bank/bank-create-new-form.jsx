import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';
import axios from 'axios';
import { useAuthContext } from '../../auth/hooks';

// ----------------------------------------------------------------------

export default function BankcreateNewForm({ currentBank }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [includeTaxes, setIncludeTaxes] = useState(false);

  const NewBankSchema = Yup.object().shape({
    bankName: Yup.string().required('bankName is required'),
    accountName: Yup.string().required('accountName is required'),
    accountNo: Yup.string().required('accountNo is required'),
    branchName: Yup.string().required('branchName is required'),
    contact: Yup.string().required('contact is required'),
    accountType: Yup.string().required('accountType is required'),
    branchAddress: Yup.string().required('branchAddress is required'),
    IFSCCode: Yup.string().required('IFSCCode is required'),
  });

  const defaultValues = useMemo(
    () => ({
      bankName: currentBank?.bankName || '',
      accountName: currentBank?.accountName || '',
      accountNo: currentBank?.accountNo || '',
      branchName: currentBank?.branchName || '',
      contact: currentBank?.contact || '',
      accountType: currentBank?.accountType || '',
      branchAddress: currentBank?.branchAddress || '',
      IFSCCode: currentBank?.IFSCCode || '',
    }),
    [currentBank]
  );

  const methods = useForm({
    resolver: yupResolver(NewBankSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentBank) {
      reset(defaultValues);
    }
  }, [currentBank, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentBank?.taxes || 0);
    }
  }, [currentBank?.taxes, includeTaxes, setValue]);


  const onSubmit = handleSubmit(async (data) => {
    const bankPayload = {
      bankName: data.bankName,
      accountName: data.accountName,
      accountNo: data.accountNo,
      branchName: data.branchName,
      contact: data.contact,
      accountType: data.accountType,
      branchAddress: data.branchAddress,
      IFSCCode: data.IFSCCode,
    };
    try {
      const url = currentBank
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/bank-account/${currentBank?._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/bank-account`;

      const method = currentBank ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: bankPayload,
        headers: { 'Content-Type': 'application/json' },
      });
      enqueueSnackbar(response.data.message, { variant: 'success' });
      reset();
      router.push(paths.dashboard.userMaster.bank);
    } catch (error) {
      console.error('API Error:', error);
      enqueueSnackbar('Failed to save the bank. Try again!', { variant: 'error' });
    }
  });


  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>

        <Grid xs={12} md={12}>
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
              <RHFTextField name="bankName" label="Bank Name" sx={{ whiteSpace: 'nowrap' }}/>
              <RHFTextField name="accountName" label="Account Name" sx={{ whiteSpace: 'nowrap' }}/>
              <RHFTextField name="accountNo" label="Bank Account No" sx={{ whiteSpace: 'nowrap' }}/>
              <RHFTextField name="branchName" label="Branch Name" sx={{ whiteSpace: 'nowrap' }}/>
              <RHFTextField name="contact" label="Mobile Number" sx={{ whiteSpace: 'nowrap' }}/>
              <RHFAutocomplete
                name='accountType'
                placeholder='Account Type'
                fullWidth
                options={['Saving', 'Current', "OD", "OC"]}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                sx={{ whiteSpace: 'nowrap' }}
              />
              <RHFTextField name="branchAddress" label="Branch Address" sx={{ whiteSpace: 'nowrap' }}/>
              <RHFTextField name="IFSCCode" label="IFSC Code" sx={{ whiteSpace: 'nowrap' }}/>

            </Box>
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
                  <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                    {currentBank ? 'Update Bank' : 'Create Bank'}
                  </LoadingButton>
                </Stack>
              </Stack>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

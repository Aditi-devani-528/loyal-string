import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useCallback, useEffect, useState } from 'react';
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
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';
import countrystatecity from '../../_mock/map/csc.json';
import axios from 'axios';
import { useAuthContext } from '../../auth/hooks';

const TAX_TYPES = ['GST', 'Sales Tax', 'VAT', 'EXCISE', 'INCOME TAX', 'TCS', 'TDS', 'GST ON REPAIR', 'GST On ORDER'];
const FINANCIAL_YEARS = ['2023-2024', '2024-2025', '2025-2026', '2026-2027', '2027-2028', '2028-2029', '2029-2030', '2030-2031', '2031-2032'];

const NewTaxSchema = Yup.object().shape({
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  taxName: Yup.string().required('Tax Name is required'),
  taxType: Yup.string().required('Tax Type is required'),
  per: Yup.string().required('Percentage is required'),
  financialYear: Yup.string().required('Financial Year is required'),
  desc: Yup.string().required('Description is required'),
  status: Yup.string(),
  isVerified: Yup.boolean(),
});

export default function TaxCreateNewForm({ currentTax }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [includeTaxes, setIncludeTaxes] = useState(false);

  const defaultValues = useMemo(
    () => ({
      country: currentTax?.country || '',
      state: currentTax?.state || '',
      taxName: currentTax?.taxName || '',
      taxType: currentTax?.taxType || '',
      per: currentTax?.per || '',
      financialYear: currentTax?.financialYear || '',
      desc: currentTax?.desc || '',
      isVerified: currentTax?.isVerified || true,
    }),
    [currentTax]
  );

  const methods = useForm({
    resolver: yupResolver(NewTaxSchema),
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
    if (currentTax) {
      reset(defaultValues);
    }
  }, [currentTax, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentTax?.taxes || 0);
    }
  }, [currentTax?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const taxPayload = {
      country: data.country,
      state: data.state,
      taxName: data.taxName,
      taxType: data.taxType,
      per: data.per,
      financialYear: data.financialYear,
      desc: data.desc,
    };

    try {
      const url = currentTax
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/tax/${currentTax?._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/tax`;

      const method = currentTax ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        headers: { 'Content-Type': 'application/json' },
        data: taxPayload,
      });
      enqueueSnackbar(response.data.message, { variant: 'success' });
      reset();
      router.push(paths.dashboard.userMaster.tax);
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to save the tax. Try again!';
      enqueueSnackbar(errorMessage, { variant: 'error' });
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
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' }}
            >
              <RHFAutocomplete
                name='country'
                label='Country'
                placeholder='Choose a country'
                options={countrystatecity.map((country) => country.name)}
                isOptionEqualToValue={(option, value) => option === value}
              />
              <RHFAutocomplete
                name='state'
                label='State'
                placeholder='Choose a State'
                options={watch('country')
                  ? countrystatecity.find((country) => country.name === watch('country'))?.states.map((state) => state.name) || []
                  : []}
                isOptionEqualToValue={(option, value) => option === value}
              />
              <RHFTextField name="taxName" label="Tax Name" />
              <RHFAutocomplete
                name='taxType'
                placeholder='Tax Type'
                fullWidth
                options={TAX_TYPES}
                getOptionLabel={(option) => option}
              />
              <RHFTextField name="per" label="Percentage %" />
              <RHFAutocomplete
                name='financialYear'
                placeholder='Financial Year'
                fullWidth
                options={FINANCIAL_YEARS}
                getOptionLabel={(option) => option}
              />
              <RHFTextField name="desc" label="Description" />
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

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    onClick={() => handleSubmit()}
                  >
                    {currentTax ? 'Update Tax' : 'Create Tax'}
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

TaxCreateNewForm.propTypes = {
  currentTax: PropTypes.object,
};

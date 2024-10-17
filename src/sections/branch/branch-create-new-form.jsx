import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMemo, useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import countrystatecity from '../../_mock/map/csc.json';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { countries } from 'src/assets/data';

import Label from 'src/components/label';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { useAuthContext } from '../../auth/hooks';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function BranchCreateNewForm({ currentBranch }) {

  const router = useRouter();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [includeTaxes, setIncludeTaxes] = useState(false);

  // Validation schema
  const NewBranchSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    type: Yup.string().required('Branch Type is required'),
    branch_head: Yup.string().required('Branch Head is required'),
    contact: Yup.string().required('Phone Number is required'),
    street: Yup.string().required('Street is required'),
    landmark: Yup.string().required('Landmark is required'),
    email: Yup.string().required('Branch Email is required').email('Branch Email must be a valid email address'),
    financial_year: Yup.string().required('Financial Year is required'),
    GST: Yup.string().required('GSTIN is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    zipcode: Yup.string().required('Zip Code is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentBranch?.name || '',
      type: currentBranch?.type || '',
      branch_head: currentBranch?.branch_head || '',
      contact: currentBranch?.contact || '',
      street: currentBranch?.address.street || '',
      landmark: currentBranch?.address.landmark || '',
      email: currentBranch?.email || '',
      financial_year: currentBranch?.financial_year || '',
      GST: currentBranch?.GST || '',
      country: currentBranch?.address.country || '',
      state: currentBranch?.address.state || '',
      city: currentBranch?.address.city || '',
      zipcode: currentBranch?.address.zipcode || '',
    }),
    [currentBranch],
  );

  const methods = useForm({
    resolver: yupResolver(NewBranchSchema),
    defaultValues,
  });

  const { reset, watch, setValue, handleSubmit, formState: { isSubmitting } } = methods;

  const values = watch();


  useEffect(() => {
    if (currentBranch) {
      reset(defaultValues);
    }
  }, [currentBranch, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentBranch?.taxes || 0);
    }
  }, [currentBranch?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const branchPayload = {
      name: data.name,
      type: data.type,
      branch_head: data.branch_head,
      GST: data.GST,
      email: data.email,
      contact: data.contact,
      address: {
        street: data.street,
        landmark: data.landmark,
        country: data.country,
        state: data.state,
        city: data.city,
        zipcode: data.zipcode,
      },
      financial_year: data.financial_year,
    };

    try {
      const url = currentBranch
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/branch/${currentBranch?._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/branch`;

      const method = currentBranch ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: branchPayload,
        headers: { 'Content-Type': 'application/json' },
      });
      enqueueSnackbar(response.data.message, { variant: 'success' });
      reset();
      router.push(paths.dashboard.userMaster.branch);
    } catch (error) {
      console.error('API Error:', error);
      enqueueSnackbar('Failed to save the branch. Try again!', { variant: 'error' });
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
              <RHFTextField name='name' label='Branch Name' />
              <RHFAutocomplete
                name='type'
                placeholder='Branch Type'
                fullWidth
                options={['ShowRoom', 'Exhibition']}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              />
              <RHFTextField name='branch_head' label='Branch Head' />
              <RHFTextField name='contact' label='Phone Number' />
              <RHFTextField name='email' label='Branch Email ID' />
              <RHFTextField name='financial_year' label='Financial Year' />
              <RHFTextField name='GST' label='GSTIN' />
              <RHFTextField name='street' label='Street' />
              <RHFTextField name='landmark' label='Landmark' />
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
                options={
                  watch('country')
                    ? countrystatecity
                      .find((country) => country.name === watch('country'))
                      ?.states.map((state) => state.name) || []
                    : []
                }
                isOptionEqualToValue={(option, value) => option === value}
              />
              <RHFAutocomplete
                name='city'
                label='City'
                placeholder='Choose a City'
                options={
                  watch('state')
                    ? countrystatecity
                      .find((country) => country.name === watch('country'))
                      ?.states.find((state) => state.name === watch('state'))
                      ?.cities.map((city) => city.name) || []
                    : []
                }
                isOptionEqualToValue={(option, value) => option === value}
              />
              <RHFTextField name='zipcode' label='Zip Code' />
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
                    {currentBranch ? 'Update Branch' : 'Create Branch'}
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

BranchCreateNewForm.propTypes = {
  currentBranch: PropTypes.object,
  user: PropTypes.object.isRequired,
};

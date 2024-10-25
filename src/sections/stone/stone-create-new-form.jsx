import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';
import { useAuthContext } from '../../auth/hooks';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function StoneCreateNewForm({ currentStone }) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [includeTaxes, setIncludeTaxes] = useState(false);

  const NewStoneSchema = Yup.object().shape({
    name: Yup.string().required('Stone Name is required'),
    lessPercent: Yup.number().min(1, 'Less Percent must be at least 1').required('Less Percent is required'),
    stoneWeight: Yup.number().min(1, 'Stone Weight must be at least 1').required('Stone Weight is required'),
    stonePieces: Yup.number().min(1, 'Stone Pieces must be at least 1').required('Stone Pieces are required'),
    stoneRate: Yup.number().positive('Stone Rate must be greater than 0').required('Stone Rate is required'),
    stoneAmount: Yup.number().required('Stone Amount is required'),
    desc: Yup.string().required('Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentStone?.name || '',
      lessPercent: currentStone?.lessPercent || '',
      stoneWeight: currentStone?.stoneWeight || '',
      stonePieces: currentStone?.stonePieces || '',
      stoneRate: currentStone?.stoneRate || '',
      stoneAmount: currentStone?.stoneAmount || '',
      desc: currentStone?.desc || '',
    }),
    [currentStone]
  );

  const methods = useForm({
    resolver: yupResolver(NewStoneSchema),
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
    if (currentStone) {
      reset(defaultValues);
    }
  }, [currentStone, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentStone?.taxes || 0);
    }
  }, [currentStone?.taxes, includeTaxes, setValue]);

  useEffect(() => {
    const stoneWeight = values.stoneWeight;
    const stoneRate = values.stoneRate;

    if (stoneWeight && stoneRate) {
      const stoneAmount = stoneWeight * stoneRate;
      setValue('stoneAmount', stoneAmount);
    }
  }, [values.stoneWeight, values.stoneRate, setValue]);


  const onSubmit = handleSubmit(async (data) => {
    const stonePayload = {
      name: data.name,
      lessPercent: data.lessPercent,
      stoneWeight: data.stoneWeight,
      stonePieces: data.stonePieces,
      stoneRate: data.stoneRate,
      stoneAmount: data.stoneAmount,
      desc: data.desc,
    };

    try {
      const url = currentStone
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/stone/${currentStone?._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/stone`;

      const method = currentStone ? 'put' : 'post';

      await axios({
        method,
        url,
        headers: { 'Content-Type': 'application/json' },
        data: stonePayload,
      });
      reset();
      enqueueSnackbar(currentStone ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.productMaster.stone);
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to save the stone. Try again!';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  });

  const renderDetails = (
    <>
      {mdUp && (
        <Grid xs={12}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Add New Stone
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
              <RHFTextField name="name" label="Stone Name" />
              <RHFTextField name="lessPercent" label="Less Percent" />
              <RHFTextField name="stoneWeight" label="Stone Weight" />
              <RHFTextField name="stonePieces" label="Stone Pieces" />
              <RHFTextField name="stoneRate" label="Stone Rate" />
              <RHFTextField name="stoneAmount" label="Stone Amount" InputProps={{ readOnly: true }} />
              <RHFTextField name="desc" label="Description" />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
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
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {currentStone ? 'Update Stone' : 'Create Stone'}
              </LoadingButton>
            </Stack>
          </Stack>
        </Grid>

      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}
        {renderActions}
      </Grid>
    </FormProvider>
  );
}

StoneCreateNewForm.propTypes = {
  currentStone: PropTypes.object,
};

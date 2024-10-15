import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import {
  _tags,
  PRODUCT_SIZE_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_COLOR_NAME_OPTIONS,
  PRODUCT_CATEGORY_GROUP_OPTIONS,
} from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFEditor,
  RHFUpload,
  RHFSwitch,
  RHFTextField,
  RHFMultiSelect,
  RHFAutocomplete,
  RHFMultiCheckbox,
} from 'src/components/hook-form';
import { countries } from 'src/assets/data';
import { Button } from '@mui/material';
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
    name: Yup.string().required('Name is required'),
    lessPercent: Yup.array().min(1, 'lessPercent is required'),
    stoneWeight: Yup.array().min(2, 'stoneWeight is required'),
    stonePieces: Yup.string().required('stonePieces is required'),
    stoneRate: Yup.number().moreThan(0, 'stoneRate is required'),
    stoneAmount: Yup.string().required('stoneAmount is required'),
    desc: Yup.string().required('desc is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentStone?.name || '',
      lessPercent: currentStone?.lessPercent || '',
      stoneWeight: currentStone?.stoneWeight || '',
      stonePieces: currentStone?.stonePieces || [],
      stoneRate: currentStone?.stoneRate || '',
      stoneAmount: currentStone?.stoneAmount || '',
      desc: currentStone?.desc || 0,
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

      const response = await axios({
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

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', []);
  }, [setValue]);

  const handleChangeIncludeTaxes = useCallback((event) => {
    setIncludeTaxes(event.target.checked);
  }, []);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Add New Stone
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >

              <RHFTextField name="stoneName" label="Stone Name" />
              <RHFTextField name="stoneLessPercent" label="Stone Less Percent" />
              <RHFTextField name="stoneWeight" label="Stone Weight" />

              <RHFTextField name="stonePieces" label="Stone Pieces" />
              <RHFTextField name="stoneRate" label="Stone Rate" />
              <RHFTextField name="stoneAmount" label="Stone Amount" />
              <RHFTextField name="description" label="Description" />
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
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Publish"
          sx={{ flexGrow: 1, pl: 3 }}
        />
        {/*
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          {!currentProduct ? 'Submit' : 'Save Changes'}
        </LoadingButton> */}

        <Stack alignItems='flex-end' sx={{ mt: 3 }}>
          <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
            {currentStone ? 'Update Stone' : 'Create Stone'}
          </LoadingButton>
        </Stack>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {/* {renderProperties} */}

        {/* {renderPricing} */}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}

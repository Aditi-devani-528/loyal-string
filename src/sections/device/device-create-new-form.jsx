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
import { fData } from 'src/utils/format-number';
import { countries, deviceType } from 'src/assets/data';
import { activeSlideStatus } from 'yet-another-react-lightbox';
import Label from 'src/components/label';

import { enqueueSnackbar, useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import axios from 'axios';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function DeviceCreateNewForm({ currentDevice }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const [includeTaxes, setIncludeTaxes] = useState(false);

  const DeviceSchema = Yup.object().shape({
    // deviceCode: Yup.string().required('deviceCode is required'),
    deviceType: Yup.string().required('DeviceType is required'),
    deactivationDate: Yup.string().required('DeactivationDate is required'),
    activationDate: Yup.string().required('ActivationDate is required'),
    serialNo: Yup.string().required('serialNo is required'),
    buildNo: Yup.string().required('buildNo is required'),
    deviceModel: Yup.string().required('deviceModel is required'),
    contact: Yup.string().required('contact is required'),
  });

  const defaultValues = useMemo(
    () => ({
      deviceType: currentDevice?.deviceType || '',
      activationDate: currentDevice?.activationDate || '',
      deactivationDate: currentDevice?.deactivationDate || '',
      serialNo: currentDevice?.serialNo || '',
      buildNo: currentDevice?.buildNo || '',
      deviceModel: currentDevice?.deviceModel || '',
      contact: currentDevice?.contact || '',
    }),
    [currentDevice]
  );

  const methods = useForm({
    resolver: yupResolver(DeviceSchema),
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
    if (currentDevice) {
      reset(defaultValues);
    }
  }, [currentDevice, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentDevice?.taxes || 0);
    }
  }, [currentDevice?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const devicePayload = {
        deviceType: data.deviceType,
        activationDate: data.activationDate,
        deactivationDate: data.deactivationDate,
        serialNo: data.serialNo,
        buildNo: data.buildNo,
        deviceModel: data.deviceModel,
        contact: data.contact,
      };

      const url = currentDevice
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/device/${currentDevice._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/device`;

      const method = currentDevice ? 'put' : 'post';

      // API request
      const response = await axios({
        method,
        url,
        data: devicePayload,
        headers: { 'Content-Type': 'application/json' },
      });

      enqueueSnackbar(response?.data?.message || 'Device saved successfully!', {
        variant: 'success',
      });
      router.push(paths.dashboard.userMaster.device);
    } catch (error) {
      console.error('Error saving device:', error);
      enqueueSnackbar('Something went wrong. Please try again.', { variant: 'error' });
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
                name="deviceType"
                placeholder="Device Type"
                type="DeviceType"
                fullWidth
                disableClearable 
                options={deviceType.map((option) => option.label)}
                getOptionLabel={(option) => option}
              />

              <RHFTextField
                name="activationDate"
                label="Device Activation Date"
                type="date"
                InputLabelProps={{ shrink: true }} 
                placeholder="" 
              />

              <RHFTextField
                name="deactivationDate"
                label="Device Deactivation Date"
                type="date"
                InputLabelProps={{ shrink: true }} 
                placeholder="" 
              />

              <RHFTextField name="serialNo." label="Device Serial No." />
              <RHFTextField name="buildNo" label="Device Build No." />
              <RHFTextField name="deviceModel" label="Device Model" />
              <RHFTextField name="contact" label="Mobile No." />
            </Box>

            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}
            >
              <Stack alignItems="flex-end">
                <LoadingButton type="button" variant="outlined" onClick={() => reset()}>
                  Reset
                </LoadingButton>
              </Stack>
              <Stack>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {currentDevice ? 'Update Device' : 'Create Device'}
                </LoadingButton>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

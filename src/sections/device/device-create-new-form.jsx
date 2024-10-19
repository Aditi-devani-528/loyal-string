import * as Yup from 'yup';
import { useMemo, useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import { deviceType } from 'src/assets/data';
import { enqueueSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import axios from 'axios';
import { useAuthContext } from 'src/auth/hooks';
import { DatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

export default function DeviceCreateNewForm({ currentDevice }) {
  const router = useRouter();
  const { user } = useAuthContext();

  const DeviceSchema = Yup.object().shape({
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
      activationDate: new Date(currentDevice?.activationDate) || '',
      deactivationDate: new Date(currentDevice?.deactivationDate) || '',
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

              <Controller
                name='activationDate'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label='Device Activation Date'
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        InputLabelProps: { shrink: true },
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />

              <Controller
                name='deactivationDate'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label='Device Deactivation Date'
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        InputLabelProps: { shrink: true },
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
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

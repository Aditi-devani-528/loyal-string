import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';
import axios from 'axios';
import { useAuthContext } from '../../auth/hooks';
import { useGetEmployee } from '../../api/employee';

// ----------------------------------------------------------------------

export default function DepartmentCreateNewForm({ currentDepartment }) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { user } = useAuthContext();
  console.log(user);
  const { enqueueSnackbar } = useSnackbar();

  const { employee } = useGetEmployee()
  console.log(employee);
  const EmployeeOptions = employee.map((item) => ({
    firstName: item.firstName,
    lastName: item.lastName,
    id: item._id,
  }));

  const NewDepartmentSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    department_head: Yup.object({
      id: Yup.string().required('Department head is required')
    }).required('Department head is required'),
    desc: Yup.string().required('Desc head is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentDepartment?.name || '',
      department_head: currentDepartment?.department_head || null,
      desc: currentDepartment?.desc || '',
    }),
    [currentDepartment]
  );

  const methods = useForm({
    resolver: yupResolver(NewDepartmentSchema),
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
    if (currentDepartment) {
      reset(defaultValues);
    }
  }, [currentDepartment, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {

    try {
      const DepartmentPayload = {
        name: data.name,
        desc: data.desc,
        department_head: data.department_head.id,
      };

      const url = currentDepartment
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/department/${currentDepartment._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/department`;

      const method = currentDepartment ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: DepartmentPayload,
        headers: { 'Content-Type': 'application/json' },
      });

      enqueueSnackbar(response?.data?.message || 'Purity saved successfully!', {
        variant: 'success',
      });
      router.push('/dashboard/userMaster/department');
    } catch (error) {
      console.error('Error saving purity:', error);
      enqueueSnackbar('Something went wrong. Please try again.', {
        variant: 'error',
      });
    }
    console.log("bjgfue", data.department_head.id);
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {mdUp && (
          <Grid md={4}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              Add New Department
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
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFTextField name="name" label="Department Name" />
                <RHFAutocomplete
                  name="department_head"
                  placeholder="Department Head"
                  fullWidth
                  options={EmployeeOptions}
                  getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                  onChange={(event, value) => setValue('department_head', value)}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.firstName} {option.lastName}
                    </li>
                  )}
                />
                <RHFTextField name="desc" label="Department Description" />
              </Box>
            </Stack>
          </Card>
        </Grid>

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
                {currentDepartment ? 'Update Department' : 'Create Department'}
              </LoadingButton>
            </Stack>
          </Stack>
        </Grid>

      </Grid>
    </FormProvider>
  );
}

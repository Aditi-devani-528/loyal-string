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

  const {employee} = useGetEmployee()
  console.log(employee);
  const EmployeeOptions = employee.map((item) => ({
    firstName: item.firstName,
      lastName: item.lastName,
    id: item._id,
  }));

  console.log(EmployeeOptions);


  const [includeTaxes, setIncludeTaxes] = useState(false);

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
      department_head: currentDepartment?.department_head || '',
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

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentDepartment?.taxes || 0);
    }
  }, [currentDepartment?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {

    try {
      // Create payload for the API
      const DepartmentPayload = {
        name: data.name,
        desc: data.desc,
        department_head: data.department_head.id,
      };


      // Determine URL and method based on create/update action
      const url = currentDepartment
        ? `${import.meta.env.VITE_HOST_API}/${user?.company}/department/${currentDepartment._id}`
        : `${import.meta.env.VITE_HOST_API}/${user?.company}/department`;

      const method = currentDepartment ? 'put' : 'post';

      // API request
      const response = await axios({
        method,
        url,
        data: DepartmentPayload,
        headers: { 'Content-Type': 'application/json' },
      });

      // Success message and redirect
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
    console.log( "bjgfue" , data.department_head.id);
  });

  const handleCategorySelect = (selectedOption) => {
    if (selectedOption) {
      console.log("Selected Department Head:", selectedOption);
    } else {
      console.log("No Department Head selected.");
    }
  };

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
          Add New Department
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
              <RHFTextField name="name" label="Department Name" />
              <RHFAutocomplete
                name="department_head"
                placeholder="Department Head"
                fullWidth
                options={EmployeeOptions}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`} // Display full name
                onChange={(event, value) => setValue('department_head', value)}  // Update form with selected value (the whole object)
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

        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          {!currentDepartment ? 'Submit' : 'Save Changes'}
        </LoadingButton>

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

import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useParams } from '../../../routes/hooks';
import { useGetEmployee } from 'src/api/employee';
import EmployeeCreateNewForm from '../employee-create-new-form';

// ----------------------------------------------------------------------

export default function EmployeeEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { employee } = useGetEmployee();

  const currentEmployee = employee?.find((e) => e?._id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading='Edit Employee'
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Employee',
            href: paths.dashboard.userMaster.employee.list,
          },
          {
            name: 'Edit Employee',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {
        currentEmployee &&
        <EmployeeCreateNewForm
          currentEmployee={currentEmployee}
        />}
    </Container>
  );
}

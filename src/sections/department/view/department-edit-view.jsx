import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { useParams } from '../../../routes/hooks';
import { useGetVendor } from '../../../api/vendor';
import { useGetDepartment } from '../../../api/department';
import DepartmentCreateNewForm from '../department-create-new-form';

// ----------------------------------------------------------------------

export default function DepartmentEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();

  const { department } = useGetDepartment()
  const currentDepartment = department?.find((e) => e?._id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading='Edit Category'
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Category',
            href: paths.dashboard.productMaster.category.list,
          },
          {
            name: 'Edit Category',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {
        currentDepartment &&
        <DepartmentCreateNewForm
          currentDepartment={currentDepartment}
        />}
    </Container>
  );
}

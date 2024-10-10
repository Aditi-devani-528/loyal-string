import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import RoleCreateNewForm from '../role-create-new-form';




// ----------------------------------------------------------------------

export default function RoleCreatePage() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Role"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User Master',
            href: paths.dashboard.user.root,
          },
          { name: 'Add Roles' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <RoleCreateNewForm/>
      
    </Container>
  );
}

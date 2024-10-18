import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import DeviceCreateNewForm from '../device-create-new-form';

// ----------------------------------------------------------------------

export default function DeviceCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Add New Devices"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User Master',
            href: paths.dashboard.user.root,
          },
          { name: 'Add Devices' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <DeviceCreateNewForm/>

    </Container>
  );
}

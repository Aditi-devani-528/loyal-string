import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import PacketCreateNewForm from '../packet-create-new-form';

// ----------------------------------------------------------------------

export default function PacketCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Packet"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Product Master',
            href: paths.dashboard.user.root,
          },
          { name: 'Add Packet ' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <PacketCreateNewForm />
    </Container>
  );
}

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import ConversionCreateNewForm from '../conversion-create-new-form';


// ----------------------------------------------------------------------

export default function ConversionCreatePage() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Rate Conversion"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User Master',
            href: paths.dashboard.user.root,
          },
          { name: 'Add  Rate Conversion' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <ConversionCreateNewForm/>
    </Container>
  );
}

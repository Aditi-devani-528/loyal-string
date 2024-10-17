import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import CounterCreateNewForm from '../counter-create-new-form';



// ----------------------------------------------------------------------

export default function CounterCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Counter"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User Master',
            href: paths.dashboard.user.root,
          },
          { name: 'Add Counter' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <CounterCreateNewForm/>
    </Container>
  );
}

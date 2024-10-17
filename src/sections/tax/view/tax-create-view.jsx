import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import TaxCreateNewForm from '../tax-create-new-form';




// ----------------------------------------------------------------------

export default function TaxCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Add New Taxes"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User Master',
            href: paths.dashboard.user.root,
          },
          { name: 'Add Taxes' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <TaxCreateNewForm/>
    </Container>
  );
}

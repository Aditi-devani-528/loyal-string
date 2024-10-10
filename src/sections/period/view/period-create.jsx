import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PairCreateNewForm from '../pair-create-new-form';



// import UserNewEditForm from '../user-new-edit-form';

// ----------------------------------------------------------------------

export default function Periodcreate() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Add Pair Customer Vendor"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Treding',
            href: paths.dashboard.user.root,
          },
          { name: 'Add Customer Credit Period' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
     <PairCreateNewForm/>
    </Container>
  );
}

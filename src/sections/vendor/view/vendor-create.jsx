import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import VendorCreateNewForm from '../vendor-create-new-form';



// import UserNewEditForm from '../user-new-edit-form';

// ----------------------------------------------------------------------

export default function VendorCreate() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Box"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Product Master',
            href: paths.dashboard.user.root,
          },
          { name: 'Add Box ' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
       <VendorCreateNewForm/>
    </Container>
  );
}

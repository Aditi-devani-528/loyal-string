import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import RateCreateNewForm from '../rate-create-new-form';



// import UserNewEditForm from '../user-new-edit-form';

// ----------------------------------------------------------------------

export default function RateCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Purity"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Product Master',
            href: paths.dashboard.user.root,
          },
          { name: 'Add Purity ' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
     <RateCreateNewForm/>
    </Container>
  );
}

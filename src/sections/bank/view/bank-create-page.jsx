import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BankcreateNewForm from '../bank-create-new-form';



// ----------------------------------------------------------------------

export default function BankCreatePage() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Add New Bank"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User Master',
            href: paths.dashboard.user.root,
          },
          { name: 'Add Bank' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <BankcreateNewForm/>
      
    </Container>
  );
}

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import BranchCreateNewForm from '../branch-create-new-form';



// ----------------------------------------------------------------------

export default function BranchCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Add New Branch"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User Master',
            href: paths.dashboard.user.root,
          },
          { name: 'Add Branch' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <BranchCreateNewForm/>

    </Container>
  );
}

import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import DiamondCreateNewForm from '../diamond-create-new-form';

// ----------------------------------------------------------------------

export default function DiamondCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Diamond"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Product Master',
            href: paths.dashboard.user.root,
          },
          { name: 'Add Diamond ' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
       <DiamondCreateNewForm/>
    </Container>
  );
}

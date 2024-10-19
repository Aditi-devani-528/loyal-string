import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import RateCreateNewForm from '../rate-create-new-form';

// ----------------------------------------------------------------------

export default function RateCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Rates"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Product Master',
            href: paths.dashboard.productMaster.rate.list,
          },
          { name: 'Add Rates ' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
     <RateCreateNewForm/>
    </Container>
  );
}

import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import BoxCreateNewForm from '../box-create-new-form';

// ----------------------------------------------------------------------

export default function BoxCreateView() {
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
            href: paths.dashboard.productMaster.box.list,
          },
          { name: 'Add Box ' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
        <BoxCreateNewForm/>
    </Container>
  );
}

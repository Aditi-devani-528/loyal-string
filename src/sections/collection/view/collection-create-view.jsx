import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import CollectionCreateNewForm from '../collection-create-new-form';

// ----------------------------------------------------------------------

export default function CollectionCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Collection"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Product Master',
            href: paths.dashboard.user.root,
          },
          { name: 'Add Collection ' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <CollectionCreateNewForm />
    </Container>
  );
}

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProductCreateNewForm from '../products-create-new-form';

// import UserNewEditForm from '../user-new-edit-form';

// ----------------------------------------------------------------------

export default function ProductsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Product"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Product Master',
            href: paths.dashboard.user.root,
          },
          { name: 'Add Product ' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <ProductCreateNewForm/>
    </Container>
  );
}

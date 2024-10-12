import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import ProductsCreateNewForm from '../products-create-new-form';
import { useGetProductMaster } from '../../../api/productmaster';
import { useParams } from '../../../routes/hooks';

// ----------------------------------------------------------------------

export default function ProductsEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { product } = useGetProductMaster();

  const currentProduct = product?.find((e) => e?._id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading='Edit Product'
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Product',
            href: paths.dashboard.productMaster.products.list,
          },
          {
            name: 'Edit Product',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {
        currentProduct &&
        <ProductsCreateNewForm
          currentProduct={currentProduct}
        />}
    </Container>
  );
}

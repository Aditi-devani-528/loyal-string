import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import CategoryCreateNewForm from '../category-create-new-form';
import { useGetCategory } from '../../../api/category';
import { useParams } from '../../../routes/hooks';

// ----------------------------------------------------------------------

export default function CategoryEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { category } = useGetCategory();

  const currentCategory = category?.find((e) => e?._id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading='Edit Category'
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Category',
            href: paths.dashboard.productMaster.category.list,
          },
          {
            name: 'Edit Category',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {
        currentCategory &&
        <CategoryCreateNewForm
          currentCategory={currentCategory}
        />}
    </Container>
  );
}

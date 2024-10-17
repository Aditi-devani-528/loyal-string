import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useParams } from '../../../routes/hooks';
import CollectionCreateNewForm from '../collection-create-new-form';
import { useGetCollection } from 'src/api/collection';

// ----------------------------------------------------------------------

export default function CollectionEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { collection } = useGetCollection();

  const currentCollection = collection?.find((e) => e?._id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit Collection"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Collection',
            href: paths.dashboard.productMaster.collection.list,
          },
          {
            name: 'Edit Collection',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {currentCollection && <CollectionCreateNewForm currentCollection={currentCollection} />}
    </Container>
  );
}

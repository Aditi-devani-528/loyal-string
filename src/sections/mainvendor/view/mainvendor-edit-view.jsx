import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { useParams } from '../../../routes/hooks';
import MainVendorCreateNewForm from '../mainvendor-create-new-form';
import { useGetVendor } from '../../../api/vendor';

// ----------------------------------------------------------------------

export default function MainVendorEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();

  const { vendor } = useGetVendor()
  const currentVendor = vendor?.find((e) => e?._id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading='Edit Vendor'
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Vendor',
            href: paths.dashboard.productMaster.category.list,
          },
          {
            name: 'Edit Vendor',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {
        currentVendor &&
        <MainVendorCreateNewForm
          currentVendor={currentVendor}
        />}
    </Container>
  );
}

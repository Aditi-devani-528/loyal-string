import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useParams } from '../../../routes/hooks';
import { useGetOccasion } from 'src/api/occasion';
import OccasionCreateNewForm from '../occasion-create-new-form';

// ----------------------------------------------------------------------

export default function OccasionEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { occasion } = useGetOccasion();

  const currentOccasion = occasion?.find((e) => e?._id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit Occasion"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Occasion',
            href: paths.dashboard.productMaster.occasion.list,
          },
          {
            name: 'Edit Occasion',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {currentOccasion && <OccasionCreateNewForm currentOccasion={currentOccasion} />}
    </Container>
  );
}

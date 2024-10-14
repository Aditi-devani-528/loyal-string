import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useGetDesign } from '../../../api/design';
import { useParams } from '../../../routes/hooks';
import DesignCreateNewForm from '../design-create-new-form';

// ----------------------------------------------------------------------

export default function DesignEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { design } = useGetDesign();

  const currentDesign = design?.find((e) => e?._id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading='Edit Design'
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Design',
            href: paths.dashboard.productMaster.design.list,
          },
          {
            name: 'Edit Design',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {
        currentDesign &&
        <DesignCreateNewForm
          currentDesign={currentDesign}
        />}
    </Container>
  );
}
     
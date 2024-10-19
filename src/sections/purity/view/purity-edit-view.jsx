import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import PurityCreateNewForm from '../purity-create-new-form';
import { useParams } from '../../../routes/hooks';
import { useGetPurity } from '../../../api/purity';
// ----------------------------------------------------------------------

export default function PurityEditView() {
  const params = useParams();
  const {purity} = useGetPurity()
  const { id } = params;
  const settings = useSettingsContext();
  const currentPurity = purity?.find((e) => e?._id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Purity"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Product Master',
            href: paths.dashboard.productMaster.purity.list,
          },
          { name: 'Add Purity ' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {currentPurity && <PurityCreateNewForm currentPurity={currentPurity} />}
    </Container>
  );
}

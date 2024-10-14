import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useParams } from '../../../routes/hooks';
import { useGetTax } from '../../../api/tax';
import TaxCreateNewForm from '../tax-create-new-form';

// ----------------------------------------------------------------------

export default function TaxEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { tax } = useGetTax();

  const currentTax = tax?.find((e) => e?._id === id);
  console.log(currentTax);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading='Edit Branch'
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Tax',
            href: paths.dashboard.userMaster.branch.list,
          },
          {
            name: 'Edit Tax',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {
        currentTax &&
        <TaxCreateNewForm
          currentTax={currentTax}
        />}
    </Container>
  );
}

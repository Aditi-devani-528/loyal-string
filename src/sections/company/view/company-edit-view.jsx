import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useParams } from '../../../routes/hooks';
import { useGetCompany } from '../../../api/company';
import CompanyCreateNewForm from '../company-create-new-form';

// ----------------------------------------------------------------------

export default function CompanyEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { company  } = useGetCompany();

  const currentCompany = company?.find((e) => e?._id === id);

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
        currentCompany &&
        <CompanyCreateNewForm
          currentCompany={currentCompany}
        />}
    </Container>
  );
}

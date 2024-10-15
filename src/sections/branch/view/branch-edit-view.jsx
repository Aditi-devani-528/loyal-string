import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useParams } from '../../../routes/hooks';
import BranchCreateNewForm from '../branch-create-new-form';
import { useGetBranch } from '../../../api/branch';

// ----------------------------------------------------------------------

export default function BranchEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { branch } = useGetBranch();

  const currentBranch = branch?.find((e) => e?._id === id);
  console.log(currentBranch);

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
            name: 'Branch',
            href: paths.dashboard.userMaster.branch.list,
          },
          {
            name: 'Edit Branch',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {
        currentBranch &&
        <BranchCreateNewForm
          currentBranch={currentBranch}
        />}
    </Container>
  );
}

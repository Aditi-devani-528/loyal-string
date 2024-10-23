import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useGetCategory } from '../../../api/category';
import { useParams } from '../../../routes/hooks';
import BankcreateNewForm from '../bank-create-new-form';
import { useGetBank } from '../../../api/bank';

// ----------------------------------------------------------------------

export default function BankEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { bank } = useGetBank();

  const currentBank = bank?.find((e) => e?._id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading='Edit Bank Account'
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Bank Account',
            href: paths.dashboard.userMaster.bank.list,
          },
          {
            name: 'Edit Bank Account',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {
        currentBank &&
        <BankcreateNewForm
          currentBank={currentBank}
        />}
    </Container>
  );
}

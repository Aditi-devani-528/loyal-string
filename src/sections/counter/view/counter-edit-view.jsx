import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useParams } from '../../../routes/hooks';
import { useGetCounter } from 'src/api/counter';
import CounterCreateNewForm from '../counter-create-new-form';

// ----------------------------------------------------------------------

export default function CounterEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { counter } = useGetCounter();

  const currentCounter = counter?.find((e) => e?._id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading='Edit Counter'
        links={[
          { 
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Counter',
            href: paths.dashboard.userMaster.counter.list,
          },
          {
            name: 'Edit Counter',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {
        currentCounter &&
        <CounterCreateNewForm
          currentCounter={currentCounter}
        />}
    </Container>
  );
}

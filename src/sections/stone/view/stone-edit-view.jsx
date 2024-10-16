import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useParams } from '../../../routes/hooks';
import StoneCreateNewForm from '../stone-create-new-form';
import { useGetStone } from '../../../api/stone';

// ----------------------------------------------------------------------

export default function StoneEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { stone } = useGetStone();

  const currentStone = stone?.find((e) => e?._id === id);
  console.log(currentStone);

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
            name: 'Stone',
            href: paths.dashboard.productMaster.stone.list,
          },
          {
            name: 'Edit Stone',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {
        currentStone &&
        <StoneCreateNewForm
          currentStone={currentStone}
        />}
    </Container>
  );
}

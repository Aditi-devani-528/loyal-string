import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useParams } from '../../../routes/hooks';
import BoxCreateNewForm from '../box-create-new-form';
import { useGetBox } from '../../../api/box';

// ----------------------------------------------------------------------

export default function BoxEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { box } = useGetBox();

  const currentBox = box?.find((e) => e?._id === id);
  console.log(currentBox);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading='Edit Box'
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Box',
            href: paths.dashboard.productMaster.box.list,
          },
          {
            name: 'Edit Box',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {
        currentBox &&
        <BoxCreateNewForm
          currentBox={currentBox}
        />}
    </Container>
  );
}

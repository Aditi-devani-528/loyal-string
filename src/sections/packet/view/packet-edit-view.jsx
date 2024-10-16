import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useParams } from '../../../routes/hooks';
import { useGetPacket } from 'src/api/pocket';
import PacketCreateNewForm from '../packet-create-new-form';

// ----------------------------------------------------------------------

export default function PacketEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { packet } = useGetPacket();

  const currentPacket = packet?.find((e) => e?._id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading='Edit Packet'
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Packet',
            href: paths.dashboard.productMaster.packet.list,
          },
          {
            name: 'Edit Packet',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {
        currentPacket &&
        <PacketCreateNewForm
          currentPacket={currentPacket}
        />}
    </Container>
  );
}

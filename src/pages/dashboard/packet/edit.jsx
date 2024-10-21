import { Helmet } from 'react-helmet-async';
import PacketEditView from '../../../sections/packet/view/packet-edit-view';

// ----------------------------------------------------------------------

export default function PacketEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Packet Edit</title>
      </Helmet>

      <PacketEditView />
    </>
  );
}

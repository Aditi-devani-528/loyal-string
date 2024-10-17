import { Helmet } from 'react-helmet-async';

import PacketCreateView from '../../../sections/packet/view/packet-create-view';

// ----------------------------------------------------------------------

export default function PacketCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Packet</title>
      </Helmet>

      <PacketCreateView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';
import BranchListView from '../../../sections/branch/view/branch-list-view';
import PacketListView from '../../../sections/packet/view/packet-list-view';


// ----------------------------------------------------------------------

export default function PacketListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Packet List</title>
      </Helmet>

      <PacketListView />
    </>
  );
}

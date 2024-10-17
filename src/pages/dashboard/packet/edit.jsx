import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import BranchEditView from '../../../sections/branch/view/branch-edit-view';
import PacketEditView from '../../../sections/packet/view/packet-edit-view';

// ----------------------------------------------------------------------

export default function PacketEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Vendore Edit</title>
      </Helmet>

      <PacketEditView id={`${id}`} />
    </>
  );
}

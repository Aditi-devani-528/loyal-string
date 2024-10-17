import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import BranchEditView from '../../../sections/branch/view/branch-edit-view';
import BoxEditView from '../../../sections/box/view/box-edit-view';

// ----------------------------------------------------------------------

export default function BoxEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Vendore Edit</title>
      </Helmet>

      <BoxEditView id={`${id}`} />
    </>
  );
}

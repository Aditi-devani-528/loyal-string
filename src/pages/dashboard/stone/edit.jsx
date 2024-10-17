import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import BranchEditView from '../../../sections/branch/view/branch-edit-view';
import StoneEditView from '../../../sections/stone/view/stone-edit-view';

// ----------------------------------------------------------------------

export default function StoneEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Stone Edit</title>
      </Helmet>

      <StoneEditView id={`${id}`} />
    </>
  );
}

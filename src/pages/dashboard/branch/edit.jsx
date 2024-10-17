import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import BranchEditView from '../../../sections/branch/view/branch-edit-view';

// ----------------------------------------------------------------------

export default function BranchEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Branch Edit</title>
      </Helmet>

      <BranchEditView id={`${id}`} />
    </>
  );
}

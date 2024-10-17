import { Helmet } from 'react-helmet-async';

import BranchCreateView from '../../../sections/branch/view/branch-create-view';

// ----------------------------------------------------------------------

export default function BranchCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Branch</title>
      </Helmet>

      <BranchCreateView />
    </>
  );
}

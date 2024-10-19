import { Helmet } from 'react-helmet-async';
import BranchEditView from '../../../sections/branch/view/branch-edit-view';

// ----------------------------------------------------------------------

export default function BranchEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Branch Edit</title>
      </Helmet>

      <BranchEditView  />
    </>
  );
}

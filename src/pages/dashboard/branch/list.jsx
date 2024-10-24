import { Helmet } from 'react-helmet-async';
import BranchListView from '../../../sections/branch/view/branch-list-view';


// ----------------------------------------------------------------------

export default function BranchListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Branch List</title>
      </Helmet>

      <BranchListView />
    </>
  );
}

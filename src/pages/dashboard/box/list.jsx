import { Helmet } from 'react-helmet-async';
import BranchListView from '../../../sections/branch/view/branch-list-view';
import BoxListView from '../../../sections/box/view/box-list-view';


// ----------------------------------------------------------------------

export default function BoxListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Vendor List</title>
      </Helmet>

      <BoxListView />
    </>
  );
}

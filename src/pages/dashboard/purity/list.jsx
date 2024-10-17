import { Helmet } from 'react-helmet-async';
import PurityListView from '../../../sections/purity/view/purity-list-view';


// ----------------------------------------------------------------------

export default function PurityListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Purity List</title>
      </Helmet>

      <PurityListView />
    </>
  );
}

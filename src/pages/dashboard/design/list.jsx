import { Helmet } from 'react-helmet-async';
import DesignListView from '../../../sections/design/view/design-list-view';


// ----------------------------------------------------------------------

export default function DesignListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Vendor List</title>
      </Helmet>

      <DesignListView />
    </>
  );
}

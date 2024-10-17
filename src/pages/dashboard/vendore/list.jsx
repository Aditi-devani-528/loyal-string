import { Helmet } from 'react-helmet-async';

import MainVendoreListView from '../../../sections/mainvendor/view/mainVendore-list-view';

// ----------------------------------------------------------------------

export default function MainVendoreListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Vendor List</title>
      </Helmet>

      <MainVendoreListView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';

import MainVendorListView from '../../../sections/mainvendor/view/mainVendore-list-view';

// ----------------------------------------------------------------------

export default function MainVendorListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Vendor List</title>
      </Helmet>

      <MainVendorListView />
    </>
  );
}

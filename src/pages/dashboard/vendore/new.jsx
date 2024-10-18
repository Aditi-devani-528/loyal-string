import { Helmet } from 'react-helmet-async';

import MainvendorCreateView from '../../../sections/mainvendor/view/mainvendor-create-view';

// ----------------------------------------------------------------------

export default function MainVendorCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <MainvendorCreateView />
    </>
  );
}

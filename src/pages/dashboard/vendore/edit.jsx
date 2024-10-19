import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import MainVendorEditView from '../../../sections/mainvendor/view/mainvendor-edit-view';

// ----------------------------------------------------------------------

export default function MainVendorEditPage() {

  return (
    <>
      <Helmet>
        <title> Dashboard: Vendor Edit</title>
      </Helmet>

      <MainVendorEditView />
    </>
  );
}

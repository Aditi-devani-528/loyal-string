import { Helmet } from 'react-helmet-async';

import DeviceEditView from '../../../sections/device/view/device-edit-view';

// ----------------------------------------------------------------------

export default function DeviceEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <DeviceEditView />
    </>
  );
}

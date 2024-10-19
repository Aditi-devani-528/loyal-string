import { Helmet } from 'react-helmet-async';

import DeviceEditView from '../../../sections/device/view/device-edit-view';

// ----------------------------------------------------------------------

export default function DeviceEditPage() {
  return (
    <>

      <Helmet>
        <title> Dashboard: Device Edit</title>
      </Helmet>

      <DeviceEditView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';

import DeviceCreateView from '../../../sections/device/view/device-create-view';

// ----------------------------------------------------------------------

export default function DeviceCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <DeviceCreateView />
    </>
  );
}

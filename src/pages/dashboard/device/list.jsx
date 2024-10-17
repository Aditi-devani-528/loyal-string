import { Helmet } from 'react-helmet-async';
import DeviceListView from '../../../sections/device/view/device-list-view';


// ----------------------------------------------------------------------

export default function DeviceListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Vendor List</title>
      </Helmet>

      <DeviceListView />
    </>
  );
}

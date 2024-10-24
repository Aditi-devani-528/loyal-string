import { Helmet } from 'react-helmet-async';
import DeviceListView from '../../../sections/device/view/device-list-view';


// ----------------------------------------------------------------------

export default function DeviceListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Device List</title>
      </Helmet>

      <DeviceListView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';
import ConversionListView from '../../../sections/conversion/view/conversion-list-view';


// ----------------------------------------------------------------------

export default function ConversionListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Vendor List</title>
      </Helmet>

      <ConversionListView />
    </>
  );
}

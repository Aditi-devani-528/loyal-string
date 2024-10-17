import { Helmet } from 'react-helmet-async';
import SkuListView from '../../../sections/sku/view/sku-list-view';


// ----------------------------------------------------------------------

export default function SkuListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Vendor List</title>
      </Helmet>

      <SkuListView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';
import TaxListView from '../../../sections/tax/view/tax-list-view';


// ----------------------------------------------------------------------

export default function TaxListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Tax List</title>
      </Helmet>

      <TaxListView />
    </>
  );
}

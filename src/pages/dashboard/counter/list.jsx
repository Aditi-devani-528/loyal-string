import { Helmet } from 'react-helmet-async';
import CounterListView from '../../../sections/counter/view/counter-list-view';


// ----------------------------------------------------------------------

export default function CounterListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Vendor List</title>
      </Helmet>

      <CounterListView />
    </>
  );
}

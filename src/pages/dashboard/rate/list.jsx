import { Helmet } from 'react-helmet-async';
import RateListView from '../../../sections/rates/view/rate-list-view';


// ----------------------------------------------------------------------

export default function RateListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Rate List</title>
      </Helmet>

      <RateListView />
    </>
  );
}

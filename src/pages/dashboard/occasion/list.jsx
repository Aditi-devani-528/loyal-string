import { Helmet } from 'react-helmet-async';
import OccasionListView from '../../../sections/occasion/view/occasion-list-view';


// ----------------------------------------------------------------------

export default function OccasionListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Occasion List</title>
      </Helmet>

      <OccasionListView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';
import DiamondListView from '../../../sections/diamond/view/diamond-list-view';


// ----------------------------------------------------------------------

export default function DiamondListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Diamond List</title>
      </Helmet>

      <DiamondListView />
    </>
  );
}

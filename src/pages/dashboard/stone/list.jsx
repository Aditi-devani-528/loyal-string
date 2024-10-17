import { Helmet } from 'react-helmet-async';
import StoneListView from '../../../sections/stone/view/stone-list-view';


// ----------------------------------------------------------------------

export default function StoneListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Stone List</title>
      </Helmet>

      <StoneListView />
    </>
  );
}

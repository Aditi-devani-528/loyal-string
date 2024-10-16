import { Helmet } from 'react-helmet-async';
import CollectionListView from '../../../sections/collection/view/collection-list-view';


// ----------------------------------------------------------------------

export default function CollectionListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Collection List</title>
      </Helmet>

      <CollectionListView />
    </>
  );
}

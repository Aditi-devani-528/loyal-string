import { Helmet } from 'react-helmet-async';

import CollectionCreateView from '../../../sections/collection/view/collection-create-view';

// ----------------------------------------------------------------------

export default function CollectionCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Collection</title>
      </Helmet>

      <CollectionCreateView />
    </>
  );
}

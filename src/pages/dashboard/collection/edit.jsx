import { Helmet } from 'react-helmet-async';
import CollectionEditView from '../../../sections/collection/view/collection-edit-view';

// ----------------------------------------------------------------------

export default function CollectionEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Branch Edit</title>
      </Helmet>

      <CollectionEditView />
    </>
  );
}

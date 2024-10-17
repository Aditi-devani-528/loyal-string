import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import CollectionEditView from '../../../sections/collection/view/collection-edit-view';

// ----------------------------------------------------------------------

export default function CollectionEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Branch Edit</title>
      </Helmet>

      <CollectionEditView id={`${id}`} />
    </>
  );
}

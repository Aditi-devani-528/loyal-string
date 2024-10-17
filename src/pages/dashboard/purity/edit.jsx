import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import PurityEditView from '../../../sections/purity/view/purity-edit-view';

// ----------------------------------------------------------------------

export default function PurityEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Vendore Edit</title>
      </Helmet>

      <PurityEditView id={`${id}`} />
    </>
  );
}

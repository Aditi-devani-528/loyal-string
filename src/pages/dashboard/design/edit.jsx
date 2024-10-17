import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import DesignEditView from '../../../sections/design/view/design-edit-view';

// ----------------------------------------------------------------------

export default function DesignEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Vendore Edit</title>
      </Helmet>

      <DesignEditView id={`${id}`} />
    </>
  );
}

import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import PurityEditView from '../../../sections/purity/view/purity-edit-view';

// ----------------------------------------------------------------------

export default function PurityEditPage() {


  return (
    <>
      <Helmet>
        <title> Dashboard: Purity Edit</title>
      </Helmet>

      <PurityEditView/>
    </>
  );
}

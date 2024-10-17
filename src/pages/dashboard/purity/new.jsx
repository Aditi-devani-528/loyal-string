import { Helmet } from 'react-helmet-async';

import PurityCreateView from '../../../sections/purity/view/purity-create-view';

// ----------------------------------------------------------------------

export default function PurityCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <PurityCreateView />
    </>
  );
}

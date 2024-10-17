import { Helmet } from 'react-helmet-async';

import BoxCreateView from '../../../sections/box/view/box-create-view';

// ----------------------------------------------------------------------

export default function BoxCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <BoxCreateView />
    </>
  );
}

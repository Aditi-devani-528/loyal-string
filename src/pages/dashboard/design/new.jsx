import { Helmet } from 'react-helmet-async';

import DesignCreateView from '../../../sections/design/view/design-create-view';

// ----------------------------------------------------------------------

export default function DesignCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <DesignCreateView />
    </>
  );
}

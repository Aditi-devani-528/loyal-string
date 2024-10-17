import { Helmet } from 'react-helmet-async';

import DiamondCreateView from '../../../sections/diamond/view/diamond-create-view';

// ----------------------------------------------------------------------

export default function DiamondCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <DiamondCreateView />
    </>
  );
}

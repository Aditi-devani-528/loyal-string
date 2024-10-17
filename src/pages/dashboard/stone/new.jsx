import { Helmet } from 'react-helmet-async';

import StoneCreateView from '../../../sections/stone/view/stone-create-view';

// ----------------------------------------------------------------------

export default function StoneCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <StoneCreateView />
    </>
  );
}

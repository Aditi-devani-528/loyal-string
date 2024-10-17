import { Helmet } from 'react-helmet-async';

import OccasionCreateView from '../../../sections/occasion/view/occasion-create-view';

// ----------------------------------------------------------------------

export default function OccasionCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <OccasionCreateView />
    </>
  );
}

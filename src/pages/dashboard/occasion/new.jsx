import { Helmet } from 'react-helmet-async';

import OccasionCreateView from '../../../sections/occasion/view/occasion-create-view';

// ----------------------------------------------------------------------

export default function OccasionCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Occasion</title>
      </Helmet>

      <OccasionCreateView />
    </>
  );
}

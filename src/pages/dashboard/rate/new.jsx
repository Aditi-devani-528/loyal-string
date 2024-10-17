import { Helmet } from 'react-helmet-async';

import RateCreateView from '../../../sections/rates/view/rate-create-view';

// ----------------------------------------------------------------------

export default function RateCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Rate</title>
      </Helmet>

      <RateCreateView />
    </>
  );
}

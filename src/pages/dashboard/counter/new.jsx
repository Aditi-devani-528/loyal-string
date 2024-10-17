import { Helmet } from 'react-helmet-async';

import CounterCreateView from '../../../sections/counter/view/counter-create-view';

// ----------------------------------------------------------------------

export default function CounterCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <CounterCreateView />
    </>
  );
}

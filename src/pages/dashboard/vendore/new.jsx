import { Helmet } from 'react-helmet-async';

import MainVendoreCreateView from '../../../sections/mainvendor/view/mainVendore-create-view';

// ----------------------------------------------------------------------

export default function MainVendoreCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <MainVendoreCreateView />
    </>
  );
}

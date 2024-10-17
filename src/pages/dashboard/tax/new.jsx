import { Helmet } from 'react-helmet-async';

import TaxCreateView from '../../../sections/tax/view/tax-create-view';

// ----------------------------------------------------------------------

export default function TaxCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Tax</title>
      </Helmet>

      <TaxCreateView />
    </>
  );
}

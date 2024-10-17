import { Helmet } from 'react-helmet-async';

import BankCreateView from '../../../sections/bank/view/bank-create-view';

// ----------------------------------------------------------------------

export default function BankCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <BankCreateView />
    </>
  );
}

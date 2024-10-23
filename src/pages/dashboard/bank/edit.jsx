import { Helmet } from 'react-helmet-async';
import BankEditView from '../../../sections/bank/view/bank-edit-view';

// ----------------------------------------------------------------------

export default function BankEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Bank Edit</title>
      </Helmet>

      <BankEditView  />
    </>
  );
}

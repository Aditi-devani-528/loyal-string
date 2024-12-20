import { Helmet } from 'react-helmet-async';
import BankListView from '../../../sections/bank/view/bank-list-view';


// ----------------------------------------------------------------------

export default function BankListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Bank List</title>
      </Helmet>

      <BankListView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';
import CompanyListView from '../../../sections/company/view/company-list-view';


// ----------------------------------------------------------------------

export default function CompanyListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Company List</title>
      </Helmet>

      <CompanyListView />
    </>
  );
}

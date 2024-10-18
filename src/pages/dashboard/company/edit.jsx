import { Helmet } from 'react-helmet-async';
import CompanyEditView from '../../../sections/company/view/company-edit-view';

// ----------------------------------------------------------------------

export default function CompanyEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Company Edit</title>
      </Helmet>

      <CompanyEditView />
    </>
  );
}

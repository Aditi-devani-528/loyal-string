import { Helmet } from 'react-helmet-async';

import CompanyCreateView from '../../../sections/company/view/company-create-view';

// ----------------------------------------------------------------------

export default function CompanyNewPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <CompanyCreateView />
    </>
  );
}

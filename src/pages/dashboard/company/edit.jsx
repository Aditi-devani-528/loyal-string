import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import CompanyEditView from '../../../sections/company/view/company-edit-view';

// ----------------------------------------------------------------------

export default function CompanyEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Vendore Edit</title>
      </Helmet>

      <CompanyEditView id={`${id}`} />
    </>
  );
}

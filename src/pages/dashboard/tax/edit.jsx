import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import BranchEditView from '../../../sections/branch/view/branch-edit-view';
import TaxEditView from '../../../sections/tax/view/tax-edit-view';

// ----------------------------------------------------------------------

export default function TaxEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Tax Edit</title>
      </Helmet>

      <TaxEditView id={`${id}`} />
    </>
  );
}

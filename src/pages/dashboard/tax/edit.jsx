import { Helmet } from 'react-helmet-async';
import TaxEditView from '../../../sections/tax/view/tax-edit-view';

// ----------------------------------------------------------------------

export default function TaxEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Tax Edit</title>
      </Helmet>

      <TaxEditView />
    </>
  );
}

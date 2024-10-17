import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import MainVendorEditView from '../../../sections/mainvendor/view/mainvendor-edit-view';

// ----------------------------------------------------------------------

export default function MainVendoreEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Vendore Edit</title>
      </Helmet>

      <MainVendorEditView id={`${id}`} />
    </>
  );
}

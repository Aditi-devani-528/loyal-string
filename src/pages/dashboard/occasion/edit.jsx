import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import OccasionEditView from '../../../sections/occasion/view/occasion-edit-view';

// ----------------------------------------------------------------------

export default function OcassionEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Branch Edit</title>
      </Helmet>

      <OccasionEditView id={`${id}`} />
    </>
  );
}

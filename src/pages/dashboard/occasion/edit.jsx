import { Helmet } from 'react-helmet-async';
import OccasionEditView from '../../../sections/occasion/view/occasion-edit-view';

// ----------------------------------------------------------------------

export default function OcassionEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Branch Edit</title>
      </Helmet>

      <OccasionEditView />
    </>
  );
}

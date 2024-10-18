import { Helmet } from 'react-helmet-async';
import BoxEditView from '../../../sections/box/view/box-edit-view';

// ----------------------------------------------------------------------

export default function BoxEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Box Edit</title>
      </Helmet>

      <BoxEditView  />
    </>
  );
}

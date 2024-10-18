import { Helmet } from 'react-helmet-async';
import StoneEditView from '../../../sections/stone/view/stone-edit-view';

// ----------------------------------------------------------------------

export default function StoneEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Stone Edit</title>
      </Helmet>

      <StoneEditView />
    </>
  );
}

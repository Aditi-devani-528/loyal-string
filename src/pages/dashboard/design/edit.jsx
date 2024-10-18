import { Helmet } from 'react-helmet-async';
import DesignEditView from '../../../sections/design/view/design-edit-view';

// ----------------------------------------------------------------------

export default function DesignEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Design Edit</title>
      </Helmet>

      <DesignEditView />
    </>
  );
}

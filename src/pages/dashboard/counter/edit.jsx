import { Helmet } from 'react-helmet-async';
import CounterEditView from '../../../sections/counter/view/counter-edit-view';

// ----------------------------------------------------------------------

export default function CounterEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Counter Edit</title>
      </Helmet>

      <CounterEditView />
    </>
  );
}

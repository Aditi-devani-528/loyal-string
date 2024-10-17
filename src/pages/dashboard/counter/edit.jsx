import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import CounterEditView from '../../../sections/counter/view/counter-edit-view';

// ----------------------------------------------------------------------

export default function CounterEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Vendore Edit</title>
      </Helmet>

      <CounterEditView id={`${id}`} />
    </>
  );
}

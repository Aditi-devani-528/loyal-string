import { Helmet } from 'react-helmet-async';

import ConversionCreateView from '../../../sections/conversion/view/conversion-create-view';

// ----------------------------------------------------------------------

export default function ConversionCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Conversion</title>
      </Helmet>

      <ConversionCreateView />
    </>
  );
}

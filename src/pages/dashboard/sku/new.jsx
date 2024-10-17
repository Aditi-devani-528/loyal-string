import { Helmet } from 'react-helmet-async';

import BranchCreateView from '../../../sections/branch/view/branch-create-view';
import SkuCreateView from '../../../sections/sku/view/sku-create-view';

// ----------------------------------------------------------------------

export default function SkuCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <SkuCreateView />
    </>
  );
}

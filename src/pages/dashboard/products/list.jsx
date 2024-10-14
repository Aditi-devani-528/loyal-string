import { Helmet } from 'react-helmet-async';

import { ProductListView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductsListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Product List</title>
      </Helmet>

      <ProductListView />
    </>
  );
}

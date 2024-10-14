import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import ProductListView from 'src/sections/products/view/products-list-view';

// ----------------------------------------------------------------------

export default function ProductsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Product Edit</title>
      </Helmet>

      <ProductListView id={`${id}`} />
    </>
  );
}

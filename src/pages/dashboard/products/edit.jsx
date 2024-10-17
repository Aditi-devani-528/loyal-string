import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ProductsEditView } from '../../../sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Product Edit</title>
      </Helmet>

      <ProductsEditView id={`${id}`} />
    </>
  );
}

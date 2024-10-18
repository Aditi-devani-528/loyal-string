import { Helmet } from 'react-helmet-async';
import ProductsEditView from '../../../sections/products/view/products-edit-view';

// ----------------------------------------------------------------------

export default function ProductsEditPage() {

  return (
    <>
      <Helmet>
        <title> Dashboard: Product Edit</title>
      </Helmet>

      <ProductsEditView  />
    </>
  );
}

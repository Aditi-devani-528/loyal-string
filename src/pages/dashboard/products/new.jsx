import { Helmet } from 'react-helmet-async';
import ProductsCreateView from '../../../sections/products/view/products-create-view';


// ----------------------------------------------------------------------

export default function ProductsCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <ProductsCreateView />
    </>
  );
}

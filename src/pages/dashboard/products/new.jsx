import { Helmet } from 'react-helmet-async';
import { ProductsCreateView } from 'src/sections/products/view';


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

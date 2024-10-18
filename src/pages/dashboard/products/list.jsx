import { Helmet } from 'react-helmet-async';
import ProductsListView from '../../../sections/products/view/products-list-view';


// ----------------------------------------------------------------------

export default function ProductsListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Product List</title>
      </Helmet>

      <ProductsListView />
    </>
  );
}

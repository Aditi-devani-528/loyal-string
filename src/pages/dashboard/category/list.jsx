import { Helmet } from 'react-helmet-async';
import CategoryListView from '../../../sections/category/view/category-list-view';


// ----------------------------------------------------------------------

export default function CategoryListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Vendor List</title>
      </Helmet>

      <CategoryListView />
    </>
  );
}

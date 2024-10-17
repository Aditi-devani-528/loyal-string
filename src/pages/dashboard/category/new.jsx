import { Helmet } from 'react-helmet-async';

import CategoryCreateView from '../../../sections/category/view/category-create-view';

// ----------------------------------------------------------------------

export default function CategoryCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <CategoryCreateView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';

import CategoryEditView from '../../../sections/category/view/category-edit-view';

// ----------------------------------------------------------------------

export default function CategoryEditPage() {

  return (
    <>
      <Helmet>
        <title> Dashboard: Category Edit</title>
      </Helmet>

      <CategoryEditView  />
    </>
  );
}

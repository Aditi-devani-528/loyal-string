import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import CategoryEditView from '../../../sections/category/view/category-edit-view';

// ----------------------------------------------------------------------

export default function CategoryEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Vendore Edit</title>
      </Helmet>

      <CategoryEditView id={`${id}`} />
    </>
  );
}

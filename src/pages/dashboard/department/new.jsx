import { Helmet } from 'react-helmet-async';

import DepartmentcreateView from '../../../sections/department/view/department-create-view';

// ----------------------------------------------------------------------

export default function DepartmentCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new product</title>
      </Helmet>

      <DepartmentcreateView />
    </>
  );
}

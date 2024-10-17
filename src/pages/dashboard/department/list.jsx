import { Helmet } from 'react-helmet-async';
import DepartmentListView from '../../../sections/department/view/department-list-view';


// ----------------------------------------------------------------------

export default function DepartmentListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Vendor List</title>
      </Helmet>

      <DepartmentListView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';
import EmployeeListView from '../../../sections/employee/view/employee-list-view';


// ----------------------------------------------------------------------

export default function EmployeeListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard:  Employee List</title>
      </Helmet>

      <EmployeeListView />
    </>
  );
}

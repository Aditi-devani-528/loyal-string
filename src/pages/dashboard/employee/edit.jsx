import { Helmet } from 'react-helmet-async';
import EmployeeEditView from '../../../sections/employee/view/employee-edit-view';

// ----------------------------------------------------------------------

export default function EmployeeEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Employee Edit</title>
      </Helmet>

      <EmployeeEditView  />
    </>
  );
}

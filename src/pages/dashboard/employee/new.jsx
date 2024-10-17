import { Helmet } from 'react-helmet-async';

import BranchCreateView from '../../../sections/branch/view/branch-create-view';
import EmployeeCreateView from '../../../sections/employee/view/employee-create-view';

// ----------------------------------------------------------------------

export default function EmployeeCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Employee</title>
      </Helmet>

      <EmployeeCreateView />
    </>
  );
}

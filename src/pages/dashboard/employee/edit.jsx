import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import EmployeeEditView from '../../../sections/employee/view/employee-edit-view';

// ----------------------------------------------------------------------

export default function EmployeeEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Employee Edit</title>
      </Helmet>

      <EmployeeEditView id={`${id}`} />
    </>
  );
}

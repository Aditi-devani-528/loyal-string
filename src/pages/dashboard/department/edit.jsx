import { Helmet } from 'react-helmet-async';
import DepartmentEditView from '../../../sections/department/view/department-edit-view';

// ----------------------------------------------------------------------

export default function DepartmentEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Department Edit</title>
      </Helmet>

      <DepartmentEditView />
    </>
  );
}

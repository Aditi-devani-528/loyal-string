import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import DepartmentEditView from '../../../sections/department/view/department-edit-view';

// ----------------------------------------------------------------------

export default function DepartmentEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Department Edit</title>
      </Helmet>

      <DepartmentEditView id={`${id}`} />
    </>
  );
}

import { Helmet } from 'react-helmet-async';
import RoleListView from '../../../sections/role/view/role-list-view';


// ----------------------------------------------------------------------

export default function RoleListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Vendor List</title>
      </Helmet>

      <RoleListView />
    </>
  );
}

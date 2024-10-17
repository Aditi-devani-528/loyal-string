import { Helmet } from 'react-helmet-async';

import RoleCreateView from '../../../sections/role/view/role-create-view';

// ----------------------------------------------------------------------

export default function RoleCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Role</title>
      </Helmet>

      <RoleCreateView />
    </>
  );
}

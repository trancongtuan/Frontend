import React from 'react';

import ErrorBoundaryRoute from 'app/common/error/error-boundary-route';
import UserManagement from './user-management';
import UserManagementUpdate from './user-management/user-management-update';
import Login from 'app/views/login/login';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/user-management`} component={UserManagement} />
    <ErrorBoundaryRoute path={`${match.url}/user-management-edit`} component={UserManagementUpdate} />
    {/* <ErrorBoundaryRoute path={`${match.url}`} component={Login} exact={true} /> */}
  </div>
);

export default Routes;

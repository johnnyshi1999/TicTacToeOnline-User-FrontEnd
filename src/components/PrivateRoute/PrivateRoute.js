import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

// function PrivateRoute({ component: Component, ...rest }) {
//   const {authTokens} = useAuth();

//   return (
//     <Route 
//       {...rest} 
//       render={(props) =>
//         authTokens ?
//         (<Component {...props} />) :
//         (<Redirect to='/login' />)
//       }/>
//   );
// }

function PrivateRoute({ children, ...rest }) {
  const {authTokens} = useAuth();

  return (
    // <Route 
    //   {...rest} 
    //   render={(props) =>
    //     authTokens ?
    //     (<Component {...props} />) :
    //     (<Redirect to='/login' />)
    //   }/>

      <Route {...rest}>{(authTokens) ? children : <Redirect to="/login" />}</Route>

  );
}

  export default PrivateRoute;
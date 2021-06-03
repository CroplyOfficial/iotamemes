import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      {userInfo ? <Route {...rest}></Route> : <Redirect to='/login'></Redirect>}
    </>
  );
};

export default PrivateRoute;

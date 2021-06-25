import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store'

const PrivateRoute = ({ children, ...rest }: any) => {
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userLogin;

  const location = window.location.pathname;

  return (
    <>
      {userInfo ? (
        <Route {...rest}></Route>
      ) : (
        <Redirect to={`/login?redirect=${location}`}></Redirect>
      )}
    </>
  );
};

export default PrivateRoute;

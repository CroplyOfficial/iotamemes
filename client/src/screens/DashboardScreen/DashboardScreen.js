import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container60 from '../../components/Container60/Container60';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import './DashboardScreen.css';

const DashboardScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Container60>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className='error'>{error}</div>
      ) : (
        <>
          <Card>
            <h2>Welcome, {userInfo.name}</h2>
            <table>
              <tr>
                <td>userID</td>
                <td>:</td>
                <td>{userInfo.id}</td>
              </tr>
              <tr>
                <td>username</td>
                <td>:</td>
                <td>{userInfo.name}</td>
              </tr>
              <tr>
                <td>email</td>
                <td>:</td>
                <td>{userInfo.email}</td>
              </tr>
            </table>
          </Card>
          <Card>
            <Link to='/settings'>
              <Button>Settings</Button>
            </Link>
            <Button style={{ marginLeft: '20px' }} onClick={logoutHandler}>
              Log Out
            </Button>
          </Card>
        </>
      )}
    </Container60>
  );
};

export default DashboardScreen;

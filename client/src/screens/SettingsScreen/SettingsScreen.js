import React, { useState, useEffect } from 'react';
import './SettingsScreen.css';
import Container60 from '../../components/Container60/Container60';
import Card from '../../components/Card/Card';
import Section from '../../components/Section/Section';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserPassword,
  updateUserProfile,
} from '../../actions/userActions';
import Loader from '../../components/Loader/Loader';

const SettingsScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const updatePublicProfileHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(email, name));
    setSuccessMessage('Updated Profile');
  };

  const updatePasswordHandler = (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      dispatch(updateUserPassword(password));
      setSuccessMessage('Updated Password');
    } else {
      setErrorMessage('Passwords do not match');
    }
  };

  return (
    <>
      <Container60>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className='error'>{error}</div>
        ) : (
          <>
            <Card>
              {successMessage && (
                <div className='success'>{successMessage}</div>
              )}
              {errorMessage && <div className='error'>{errorMessage}</div>}
              <h1>Profile Settings</h1>
              <Section>
                <form onSubmit={updatePublicProfileHandler}>
                  <label htmlFor='name'>Full Name</label>
                  <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor='email'>Email Address</label>
                  <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input type='submit' value='CONFIRM' />
                </form>
              </Section>
              <h1>Update Password</h1>
              <Section>
                <form onSubmit={updatePasswordHandler}>
                  <label htmlFor='pass1'>New Password</label>
                  <input
                    type='password'
                    id='pass1'
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor='pass2'>Confirm Password</label>
                  <input
                    type='password'
                    id='pass2'
                    placeholder='Confirm Password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <input type='submit' value='CONFIRM' />
                </form>
              </Section>
            </Card>
          </>
        )}
      </Container60>
    </>
  );
};

export default SettingsScreen;

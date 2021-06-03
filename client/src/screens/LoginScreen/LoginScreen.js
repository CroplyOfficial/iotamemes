import React, { useEffect, useState } from 'react';
import '../RegisterScreen/register.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <main>
      <div className='loginForm'>
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          {error && <div className='error'>{error}</div>}
          <input
            type='email'
            name='email'
            id='email'
            placeholder='name@example.com'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            name='password'
            id='password'
            required
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            Need an account? <Link to='/register'>Register Instead</Link>
          </p>
          <input type='submit' value='Sign In' />
        </form>
      </div>
    </main>
  );
};

export default LoginScreen;

import React, { useState, useEffect } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <main>
      <div className='loginForm'>
        <h2>Register</h2>

        <form onSubmit={submitHandler}>
          {message && <div className='error'>{message}</div>}
          {error && <div className='error'>{error}</div>}
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Full Name'
            required
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type='password'
            name='password2'
            id='password2'
            placeholder='Confirm Password'
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p>
            Already have an account? <Link to='/login'>Login</Link> instead.
          </p>
          <input type='submit' value='Register' />
        </form>
      </div>
    </main>
  );
};

export default RegisterScreen;

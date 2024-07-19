// src/components/SignIn.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import '../style.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = 'Username is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Fetching users to find matching username and password
    const response = await fetch('http://localhost:8000/users');
    const users = await response.json();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      dispatch(loginSuccess({ user, token: user.id }));
      navigate('/');
    } else {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className='sign'>
      <div className='inputs'>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        <button className='signbtn' type="submit">Sign In</button>
        <Link to='/signup'>Don't have an account? SignUp</Link>
      </div>
    </form>
  );
};

export default SignIn;

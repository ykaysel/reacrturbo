// src/components/SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRepeatPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = async () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = 'Username is required';
    } else {
      // Check if the username already exists
      const response = await fetch('http://localhost:8000/users');
      const users = await response.json();
      const userExists = users.some(user => user.username === username);
      if (userExists) {
        newErrors.username = 'Username already exists';
      }
    }

    if (!phone || phone.length<10 || phone.length>13) {
      newErrors.phone = 'Enter valid Phone number: xxx-xxx-xx-xx';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (password !== rePassword) {
      newErrors.rePassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!(await validateForm())) {
      return;
    }

    const response = await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, phone })
    });

    if (response.ok) {
      navigate('/signin');  // Navigate to sign in page after sign up
    } else {
      alert('Register failed');
    }
  };

  return (
    <form onSubmit={handleRegister} className='sign'>
      <div className='inputs'>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        <input
          type="password"
          value={rePassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          placeholder="Repeat Password"
        />
        {errors.rePassword && <p style={{ color: 'red' }}>{errors.rePassword}</p>}
        <button className='signbtn' type="submit">Sign Up</button>
        <Link to='/signin'>Have an account? SignIn</Link>
      </div>
    </form>
  );
};

export default SignUp;

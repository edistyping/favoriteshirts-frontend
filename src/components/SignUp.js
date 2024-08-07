import React, { useState } from 'react';

import { api } from '../utils/api'
import { useDispatch } from 'react-redux'
import { setUserSignIn } from '../redux/actions/userAction'

const SignUp = ({ closeModal }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch()
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Implement sign-up logic here
    const {statusCode, data} = await api.postRequest('/api/auth/register', {
      Email: email,
      Username: username,
      Password: password,
    })
    if (statusCode === 400 || statusCode === 401 || statusCode === 403 || statusCode === 404 || statusCode === 500) {
      alert("Sorry, error!")
      return
    }

    // dispatch(setUserSignIn(JSON.parse(data)));

    closeModal();
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign Up</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
};

export default SignUp;

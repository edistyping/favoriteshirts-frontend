import './SignUp.css'

import React, { useState } from 'react';

import { api } from '../utils/api'
import { useDispatch } from 'react-redux'
import { setUserSignIn } from '../redux/actions/userAction'

const SignUp = ({ closeModal }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [favoritecolor, setFavoritecolor] = useState('');

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
      FavoriteColor: favoritecolor
    })
    if (statusCode === 400 || statusCode === 401 || statusCode === 403 || statusCode === 404 || statusCode === 500) {
      alert("Sorry, error!")
      return
    }

    // dispatch(setUserSignIn(JSON.parse(data)));

    closeModal();
  };

  return (
    <div className='signup__form'>
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
        <div>
          <label>Choose Your Favorite Color</label>
          <input type="favoritecolor" value={favoritecolor} onChange={(e) => setFavoritecolor(e.target.value)} required />
        </div>

        <div className='signup__btn__container'>
          <button type="submit">Sign Up</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

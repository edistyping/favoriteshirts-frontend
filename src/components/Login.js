import './Login.css'; // Import the CSS file for styling

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '../utils/api';
import { setUserSignIn } from '../redux/actions/userAction';


const Login = ({ closeModal }) => {

  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Implement login logic here
    const {statusCode, data} = await api.postRequest('/api/auth/login', {
      Email: email,
      Username: username,
      Password: password,
    })

    if (statusCode === 400 || statusCode === 401 || statusCode === 404 || statusCode === 500 || statusCode === 403) {
      alert("Wrong Credential entered!")
      return
    }

    dispatch(setUserSignIn(data));

    closeModal();
  };

  return (
    <div className="login__form">
      
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>

        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        
        <div className='login__btn__container'>
          <button type="submit">Login</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </div>
        
      </form>
    </div>
  );
};

export default Login;

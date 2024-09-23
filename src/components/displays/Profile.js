import './Profile.css'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import {api} from '../../utils/api'
import { setUserDelete } from '../../redux/actions/userAction'

const Profile = () => {

  const [username, setUsername] = useState('');

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(setUserDelete()).unwrap().then(() => {
        window.location.reload();
    });

  };

  return (
    <div className='profile__container'>
      <h2>Profile</h2>

      <div className='profile__form' >
        <h3>Hello, {user.userInfo.details.username}! </h3>
    
        <div className='profile__form__section'>
          <p>Change your favorite color: </p>    
          <input type="text" placeholder="Provide your new favorite color" />
        </div>

        <button onClick={handleDelete}>Delete your account</button>
      </div>

    </div>
  );
};

export default Profile;

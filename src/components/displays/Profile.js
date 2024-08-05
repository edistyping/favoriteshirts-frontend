import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import {api} from '../../utils/api'
import { setUserDelete } from '../../redux/actions/userAction'

const Profile = () => {

  const [username, setUsername] = useState('');

  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(setUserDelete()).unwrap().then(() => {
        window.location.reload();
    });

  };


  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {username}</p>
            <button onClick={handleDelete}>Delete Account</button>
      <>yo</>

    </div>
  );
};

export default Profile;

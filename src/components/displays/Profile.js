import './Profile.css'

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import {api} from '../../utils/api'
import { setUserDelete, updateUser } from '../../redux/actions/userAction'

const Profile = () => {

  const [username, setUsername] = useState('');
  const [color, setColor] = useState('');
  
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  
  const handleDelete = async (e) => {
    e.preventDefault();

    dispatch(setUserDelete()).unwrap().then(() => {
        window.location.reload();
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a API call to change the favorite color of user 
    alert(JSON.stringify(user))

    const updated_user = { username: user.userInfo.details.username, favoritecolor: color };

    const {statusCode, data} = await api.patchRequest(`/api/user/0`, updated_user);
      
    alert(statusCode)
    if (statusCode === 200 || statusCode === 204) {
      alert("Your favorite color is changed!")
      dispatch(updateUser(user, updated_user));
    } else {
      alert("Your favorite color is not changed!")
    }

    setColor("")

  };

  return (
    <div className='profile__container'>
      <h2>UPDATE YOUR PROFILE</h2>

      <div className='profile__form' >
    
        <div className='profile__form__section'>
            <p>CHANGE YOUR FAVORITE COLOR: </p>    
            <input type="text" placeholder={"Your current favorite color is " + user.userInfo.details.favoritecolor} value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        
        <div className='profile__form__btn__container'>
          <button onClick={handleSubmit}>SUBMIT</button>
        </div>
      </div>

      <div className='profile__btn__container'>
        <p onClick={handleDelete}>DELETE YOUR ACCOUNT</p>
      </div>

    </div>
  );
};

export default Profile;

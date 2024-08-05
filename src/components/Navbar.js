import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import SignUp from './SignUp';
import './Navbar.css'; // Import the CSS file for styling
import { api } from '../utils/api'

import logo from '../assets/images/favorite_logo.jpg'; // Tell webpack this JS file uses this image

import { setInitialState } from '../redux/actions/userAction'
// import { signOut } from './authSlice'; // Assuming you have an authSlice for handling authentication

const Navbar = () => {

  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const location = useLocation();

  const openLoginModal = () => setLoginModalIsOpen(true);
  const closeLoginModal = () => setLoginModalIsOpen(false);

  const openSignUpModal = () => setSignUpModalIsOpen(true);
  const closeSignUpModal = () => setSignUpModalIsOpen(false);

  const handleSignOut = async () => {
    const { statusCode, data } = await api.postRequest('/api/auth/logout');    
    if (statusCode === 200) {
      dispatch(setInitialState());
      window.location.reload();
      //   dispatch(signOut());
    }
  };

  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>

      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>HOME</Link>
      <Link to="/white" className={location.pathname === '/white' ? 'active' : ''}>WHITE</Link>
      <Link to="/nologo" className={location.pathname === '/nologo' ? 'active' : ''}>NO LOGO</Link>
      <Link to="/logo" className={location.pathname === '/logo' ? 'active' : ''}>LOGO</Link>
      <Link to="/post" className={location.pathname === '/post' ? 'active' : ''}>POST</Link>
      
      <Link to="/favorite" className={location.pathname === '/favorite' ? 'active' : ''}>FAVORITE</Link>

      {user.userInfo.isLogin ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <>
          <button onClick={openLoginModal}>Login</button>
          <button onClick={openSignUpModal}>Sign Up</button>
        </>
      )}

      <Modal isOpen={loginModalIsOpen} onRequestClose={closeLoginModal} contentLabel="Login Modal">
        <Login closeModal={closeLoginModal} />
      </Modal>
      
      <Modal isOpen={signUpModalIsOpen} onRequestClose={closeSignUpModal} contentLabel="Sign Up Modal">
        <SignUp closeModal={closeSignUpModal} />
      </Modal>

      {user.userInfo.isLogin ? 
        <>
          <p>Welcome, {user.userInfo.details.username}</p>
          <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link>      
          <Link to="/myposts" className={location.pathname === '/post' ? 'active' : ''}>MY POST</Link>
        </>
      : <></>}

    </nav>
  );
};

export default Navbar;

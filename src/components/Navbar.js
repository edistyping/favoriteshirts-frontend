import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import SignUp from './SignUp';

import './Navbar.css'; // Import the CSS file for styling.

import { api } from '../utils/api'

import logo from '../assets/images/home_logo.jpg'; // Tell webpack this JS file uses this image

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
      alert('signed out')
      
      dispatch(setInitialState());
      // window.location.reload();
      //   dispatch(signOut());
    }
  };

  // remove this once done testing.
  const { items: favorites, loaded } = useSelector((state) => state.favorites);

  return (
    <nav className="navbar">
      <div className="navbar-left">

        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo"/>
        </Link>

        <Link to="/" className={`${location.pathname === '/' ? 'active' : ''} navbar-link`}>HOME</Link>
        <Link to="/white" className={`${location.pathname === '/white' ? 'active' : ''} navbar-link`}>WHITE</Link>
        <Link to="/nologo" className={`${location.pathname === '/nologo' ? 'active' : ''} navbar-link`}>NO LOGO</Link>
        <Link to="/logo" className={`${location.pathname === '/logo' ? 'active' : ''} navbar-link`}>LOGO</Link>

        <div style={{color: "white", background: user.userInfo.details.favoritecolor ? "#" + user.userInfo.details.favoritecolor : "orange", }}>
          <p>{JSON.stringify(user)}</p>
          <p>Favorite: {JSON.stringify(favorites)}</p>
        </div>

      </div>

      <div className="navbar-right">

        <Link to="/post" className={`${location.pathname === '/post' ? 'active' : ''} navbar-link`}>POST</Link>
        <Link to="/favorite" className={`${location.pathname === '/favorite' ? 'active' : ''} navbar-link`}>FAVORITE</Link>

        {user.userInfo.isLogin ? (
          <button onClick={handleSignOut} className='navbar-button'>Sign Out</button>
        ) : (
          <>
            <button onClick={openLoginModal} className='navbar-button'>Login</button>
            <button onClick={openSignUpModal} className='navbar-button'>Sign Up</button>
          </>
        )}

        <Modal className="login__modal" isOpen={loginModalIsOpen} onRequestClose={closeLoginModal} contentLabel="Login Modal">
          <Login closeModal={closeLoginModal} />
        </Modal>
        
        <Modal className="signup__modal" isOpen={signUpModalIsOpen} onRequestClose={closeSignUpModal} contentLabel="Sign Up Modal">
          <SignUp closeModal={closeSignUpModal} />
        </Modal>

        {user.userInfo.isLogin ? 
          <>
            <p>Welcome, {user.userInfo.details.username}</p>
            <Link to="/profile" className={`${location.pathname === '/profile' ? 'active' : ''} navbar-link`}>Profile</Link>      
            <Link to="/myposts" className={`${location.pathname === '/myposts' ? 'active' : ''} navbar-link`}>MY POST</Link>
          </>
        : <></>}

      </div>
    </nav>
  );
};

export default Navbar;

import './Navbar.css'
import { useState } from "react"
import {Link, json, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {useMemo} from 'react'

// https://mui.com/material-ui/react-modal/
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import {logout} from '../utils/localstorage'
import LoginSignUp from './LoginSignUp/LoginSignUp'

import home_logo from '../assets/images/home_logo.jpg';
import favorite_logo from '../assets/images/favorite_logo.jpg';

import { api } from '../utils/api'

import { updateCategory, updateFavorite } from '../redux/counter/categorySlice'
import { setInitialState, setUserDetails } from '../redux/actions/userAction'
import { setInitialFavorites } from '../redux/counter/favoritesSlice'
import { useEffect } from 'react'

const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Navbar2 = ({click}) => {

  // Can use 'selectedCategory' for some marking Active 
  const selectedCategory = useSelector((state) => state.category.value)

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const _handleLogout = () => {
    dispatch(setInitialState())
    logout()
    window.location.reload();
    //dispatch(setInitialFavorites())
    // history.push('/')
  }
  
  
  const _handleLogout2 = async () => {
    try {
        await api.postRequest('/api/auth/logout');
        logout()
        window.location.reload();
        // Redirect to login page or homepage after logout
    } catch (error) {
        console.error('Logout failed', error);
    }
  };

  const [open, setOpen] = useState(false)
  function handleOpen(e) {
    setOpen(true);
  }
  function handleClose(e) {
    setOpen(false);
  }
  
  return (
    <nav className="navbar">

      <Link className="navbar__logo" to="/">
        <img height={60} src={home_logo} alt="home logo" />
      </Link>
  
      <ul className="navbar__category" style={{background: "green" }}>
        <Link to="/">All</Link>
        <Link to="/white">White</Link>
        <Link to="/logo">Logo</Link>
        <Link to="/nologo">No Logo</Link>
        <Link to="/special">Special</Link>
        <Link to="/favorite">Favorites</Link>

        <Link to="/post">Post a Deal</Link>
      </ul>



      <ul className='navbar__links'>
        {!user.userInfo.isLogin ? (
          <li>
           <LoginSignUp/>
          </li>
        ) : (
          <li>
            
            <Link to="/myposts">My Posts</Link>
            <button onClick={_handleLogout2}>Logout</button>
          </li>
        )}

        {/*
          <li>
            <Link to="/advertise">Advertise Your Shirt</Link>
          </li>
        
          <li className='navbar__recommendation'>
            <Link to="/recommendation">Click for Recommendation!</Link>
          </li>
        */}

      </ul>


    </nav>
  )
}

export default Navbar2

import './Navbar.css'
import { useState } from "react"
import {Link, useNavigate} from 'react-router-dom'
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

const Navbar = ({click}) => {

  // Can use 'selectedCategory' for some marking Active 
  const selectedCategory = useSelector((state) => state.category.value)

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const _handleLogout = () => {
    dispatch(setInitialState())
    logout()
    //dispatch(setInitialFavorites())
    // history.push('/')
  }
  
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
        <Link to="/white">White</Link>
        <Link to="/logo">Logo</Link>
        <Link to="/nologo">No Logo</Link>
        <Link to="/special">Special</Link>
      </ul>
      
      <Link to="/favorite">Favorites</Link>

      <ul className='navbar__links'>
        {!user.userInfo.isLogin ? (
          <li>
           <LoginSignUp/>
          </li>
        ) : (
          <li>
            <p onClick={_handleLogout}>Logout</p>
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

      <Link to="/post">Post a Deal</Link>

    </nav>
  )
}

export default Navbar

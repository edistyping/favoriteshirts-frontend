import './Home.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Product from './Product'
import ProductDetail from './ProductDetail'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { decrement, increment } from '../redux/counter/counterSlice'
import { getProducts as listProducts } from '../redux/actions/productActions'
import { setUserDetails } from '../redux/actions/userAction'
import { setInitialFavorites, updateFavorites } from '../redux/counter/favoritesSlice'

import { api } from '../utils/api'
import { current } from '@reduxjs/toolkit'

import { getDefaultFavorites, setFavorites} from '../utils/localstorage'

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

const Home = () => {
  console.log('   Home component...')
  const dispatch = useDispatch()

  const [time, setTime] = useState(Date.now());

  // Use Redux 
  const response = useSelector(state => state.products)
  const {products, loading, error} = response

  const user = useSelector(state => state.user)
  const count = useSelector((state) => state.counter.value)
  const selectedCategory = useSelector((state) => state.category.value)
  const currentFavorites = useSelector((state) => state.favorites.value)

  useEffect(() => {
    console.log('   Home() useEffect...')
    dispatch(listProducts())
    dispatch(setUserDetails())
    dispatch(setInitialFavorites())
  }, [dispatch])

  useEffect(() => {
    const interval = setInterval(async () => {
      if (user.userInfo.isLogin) {
        const user_id = user.userInfo.details.id
        const favorites = getDefaultFavorites() // ISSUE: 'currentFavorites' stays on as the old/original data
        const {statusCode, data} = await api.postRequest('/api/user/updatefavorites', {user_id, favorites })
      }
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, [user]);

  async function handleFavorite(selectedFavorite) {
      // Update localStorage and User.favorites redux
      // 1. check if selectedFavorite is included in Userfavorites. 
    selectedFavorite = Number(selectedFavorite)
    let new_favorites = [...currentFavorites]
    if (currentFavorites.length === 0) {
      new_favorites.push(selectedFavorite)
    } else {
      let index = new_favorites.findIndex((element) => element === selectedFavorite)
      if (index === -1) {
        new_favorites.push(selectedFavorite)
      } else {
        new_favorites = new_favorites.filter(new_favorite => new_favorite !== selectedFavorite)
      }
    }
    setFavorites(JSON.stringify(new_favorites))
    dispatch(updateFavorites(new_favorites))
  }

  return (
    <div className="homescreen">
        {loading ? (
          <div>
            <h2>Loading...</h2>
          </div>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <div>
            <h1>This is home fam</h1>
            
          </div>
        )}

    </div>
  )
}

export default Home

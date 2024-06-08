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

import { loadFavorites, setFavorites} from '../utils/localstorage'

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
  const favorites = useSelector((state) => state.favorites.value)

  useEffect(() => {
    console.log('   Home() useEffect...')
    dispatch(listProducts())
  }, [dispatch])

  useEffect(() => {
    const interval = setInterval(async () => {
      if (user.userInfo.isLogin) {
        console.log('ayo')
        console.log(user);
        const user_id = user.userInfo.details.id
        const favorites = loadFavorites() // ISSUE: 'currentFavorites' stays on as the old/original data
        // const {statusCode, data} = await api.postRequest('/api/user/updatefavorites', {user_id, favorites })
      }
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, [user]);

  async function handleFavorite(selectedFavorite) {
    // Update localStorage and Redux/State
    console.log('   handleFavorite()...')
    selectedFavorite = Number(selectedFavorite)

    const isFound = favorites.find((item) => item === selectedFavorite);
    let newFavorites = []

    if (isFound) {
        newFavorites = favorites.filter(favorite => favorite !== selectedFavorite)
    } else {
        newFavorites = [...favorites]
        newFavorites.push(selectedFavorite)
    }
    window.localStorage.setItem('favorites', JSON.stringify(newFavorites))
    dispatch(updateFavorites(newFavorites)) 
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
            <p>Welcome to my website! {favorites}</p>
            <div className='homescreen__products'>
              {products.map(product => (
                <Product
                    key={product.id}
                    id={product.id}
                    description={product.description ? product.description : ""}
                    name={product.name}
                    price={product.price}
                    pack={product.pack}
                    imageUrls={product.imageUrls}
                    productUrls={product.productUrls}
                    features={product.features}
                    maintenance={product.maintenance}
                    tags={product.tag}
                    uploadedBy={product.uploadedBy}
                    handleFavorite={handleFavorite}
                />
              ))}
            </div>
        </div>
        )}

    </div>
  )
}

export default Home

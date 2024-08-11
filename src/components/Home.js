import './Home.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Product from './Product'
import ProductDetail from './ProductDetail'

import { getProducts as listProducts } from '../redux/actions/productActions'
import { fetchFavorites, addFavorite, removeFavorite } from '../redux/counter/favoritesSlice'

import { api } from '../utils/api'
import { current } from '@reduxjs/toolkit'

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

  const response = useSelector(state => state.products)
  const {products, loading, error} = response

  const user = useSelector(state => state.user)
  const { items: favorites, loaded } = useSelector((state) => state.favorites);

  useEffect(() => {
    console.log('   Home() useEffect...')

    dispatch(listProducts())

    if (products){
      // once product loads, get Favorites
      console.log("(Home) Products are loaded... so getting Favorite");
      console.log(products);

      dispatch(fetchFavorites(user.userInfo.isLogin));
    }

  }, [dispatch])

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
            
            <div>
              <p>HOME</p>
              <p>{JSON.stringify(user)}</p>
              <p>Favorite: {JSON.stringify(favorites)}</p>
            </div>

            <div className='homescreen__products'>
              {products.map((product, index) => (
                  <Product
                  key={product.id}
                  product={product} 
                  />
              ))}
            </div>
        </div>
        )}

    </div>
  )
}

export default Home

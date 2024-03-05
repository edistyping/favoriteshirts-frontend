import './Home.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Product from './Product'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { getProducts as listProducts } from '../redux/actions/productActions'

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

const White = () => {
  console.log('   White component...')
  const dispatch = useDispatch()

  // Use Redux 
  const response = useSelector(state => state.products)
  const {products, loading, error} = response

  useEffect(() => {
    console.log('   White() useEffect...')
    dispatch(listProducts())
  }, [dispatch])

  
  async function handleFavorite(selectedFavorite) {
      // Update localStorage and User.favorites redux
      // 1. check if selectedFavorite is included in Userfavorites. 

  }

  return (
    <div className="homescreen">
            <h2 className="homescreen__title">Stay Fresh </h2>
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
  )
}

export default White

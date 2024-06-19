import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { api } from '../../utils/api'

import Product from '../Product'

import { getProductsByCategory } from '../../redux/actions/productActions'
import { updateFavorites } from '../../redux/counter/favoritesSlice'

const Logo = ({  }) => {
    console.log('Logo here')
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const response = useSelector(state => state.products)
    const {products, loading, error} = response
    const favorites = useSelector((state) => state.favorites.value)

    useEffect(() => {
        dispatch(getProductsByCategory('LOGO'))
    }, [dispatch])
    
    
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
        <div >
            <div className='homescreen__products'>
                { products && products.length > 0 ? products.map(product => (
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
                        /> ))
                        : products && products.length === 0 ? 
                            <>
                                No Items
                            </>
                        : 
                            <>
                                LOADING HERE
                            </>
                    }
          </div>
        </div>

    );
};

export default Logo;
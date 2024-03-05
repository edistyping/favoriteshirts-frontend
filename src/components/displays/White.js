import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { api } from '../../utils/api'

import Product from '../Product'

import { getProductsByCategory } from '../../redux/actions/productActions'

import { updateFavorites2 } from '../../redux/counter/favoritesSlice'

const White = ({ }) => {
    console.log('White here')
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const response = useSelector(state => state.products)
    const {products, loading, error} = response

    useEffect(() => {
        dispatch(getProductsByCategory('WHITE'))
    }, [dispatch])
    

    // TEST
    const currentFavorites = useSelector((state) => state.favorites.value)
    async function handleFavorite(selectedFavorite) {
        // Update localStorage and Redux/State
        console.log('           handleFavorite()...')
        selectedFavorite = Number(selectedFavorite)

        // do separaetly here or update in updateFavorites at the same time?  
        dispatch(updateFavorites2(selectedFavorite)) // Redux/State
    }

    return (
        <div>
            <p>{JSON.stringify(user)}</p>
            <p>White here</p>
            <p>This will be available in future</p>
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
    );
};

export default White;
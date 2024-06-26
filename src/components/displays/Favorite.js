import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { api } from '../../utils/api'

import { getProducts, getProductsByCategory } from '../../redux/actions/productActions'
import { updateFavorites } from '../../redux/counter/favoritesSlice'

import Product from '../Product'

const Favorite = ({  }) => {
    console.log('Favorite here')

    const dispatch = useDispatch()
    
    const user = useSelector(state => state.user)
    const favorites = useSelector((state) => state.favorites.value)
    const response = useSelector(state => state.products)
    const {products, loading, error} = response

    useEffect(() => {
        dispatch(getProducts())
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
        <div>
            <div className='homescreen__products'>
                { favorites.length > 0 ? 
                    products.filter(product => favorites.includes(Number(product.id))).map(product => 
                        <>
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
                                    user={user}
                                    />
                        </>
                    )
                :   
                <div>
                    <p>You have no favorites at the moment</p>
                </div>
                }

            </div>
        </div>
    );
};

export default Favorite;
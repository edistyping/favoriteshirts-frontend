import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { api } from '../../utils/api'

import { getProductsByFavorites } from '../../redux/actions/productActions'
import { updateFavorites } from '../../redux/counter/favoritesSlice'

import Product from '../Product'

const Favorite = () => {
    console.log('Favorite here');

    const dispatch = useDispatch()
    
    const user = useSelector(state => state.user)
    const favorites = useSelector((state) => state.favorites.value)
    const response = useSelector(state => state.products)
    const {products, loading, error} = response

    console.log(products);

    useEffect(() => {
        dispatch(getProductsByFavorites())
        
    }, [dispatch])

    async function handleFavorite(selectedFavorite) {

    }
    
    return (
        <div>
            <div className='homescreen__products'>
                { products && products.length > 0? 
                    products.map(product => 
                        <>
                            <Product
                                    key={product.id}
                                    id={product.id}
                                    description={product.description ? product.description : ""}
                                    name={product.name}
                                    price={product.price}
                                    pack={product.pack}
                                    imageUrls={product.imageUrls}
                                    productUrls={[product.productUrls]}
                                    features={product.features}
                                    maintenance={product.maintenance}
                                    tags={product.tag}
                                    uploadedBy={product.uploadedBy}
                                    handleFavorite={handleFavorite}
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
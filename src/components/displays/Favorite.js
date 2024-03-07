import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { api } from '../../utils/api'

import { getProductsByCategory } from '../../redux/actions/productActions'

import Product from '../Product'

const Favorite = ({  }) => {
    console.log('Favorite here')

    const dispatch = useDispatch()
    
    const user = useSelector(state => state.user)
    const favorites = useSelector((state) => state.favorites.value)

    useEffect(() => {
        // dispatch(getProductsByCategory('NOLOGO'))
    }, [dispatch])

    return (
        <div>
            <p>{JSON.stringify(user)}</p>
            <p>Favorite here</p>
            <p>This will be available in future</p>
            Here: {JSON.stringify(favorites)}
            <div className='homescreen__products'>
                {products2.map(product => (
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
                        // handleFavorite={handleFavorite}
                        user={user}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorite;
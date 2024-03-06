import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { api } from '../../utils/api'

import Product from '../Product'

import { getProductsByCategory } from '../../redux/actions/productActions'

const Logo = ({  }) => {
    console.log('Logo here')
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const response = useSelector(state => state.products)
    const {products, loading, error} = response

    useEffect(() => {
        dispatch(getProductsByCategory('LOGO'))
    }, [dispatch])
    
    return (
        <div >
            <p>{JSON.stringify(user)}</p>
            <p>LOGO here</p>
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
                    // handleFavorite={handleFavorite}
                    user={user}

                />
            ))}
          </div>
        </div>

    );
};

export default Logo;
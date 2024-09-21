import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { api } from '../../utils/api'


import { getProductsByFavorites } from '../../redux/actions/productActions'
import { updateFavorites } from '../../redux/counter/favoritesSlice'

import ProductModal from '../ProductModal'; // Import your Modal component
import { fetchFavorites } from '../../redux/counter/favoritesSlice'

import Product from '../Product'

const Favorite = () => {
    console.log('Favorite here');

    const dispatch = useDispatch();
    
    const user = useSelector(state => state.user);

    // const favorites = useSelector((state) => state.favorites.items);
    const { items: favorites, loaded } = useSelector((state) => state.favorites);

    const response = useSelector(state => state.products)
    const { products, loading, error } = response

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
    const closeSignUpModal = () => setSignUpModalIsOpen(false);

    useEffect(() => {
        dispatch(getProductsByFavorites(favorites))
    }, [dispatch])
    
    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    if (loading) {
        return <div style={{color: "red"}}>LOADING!</div>
    }

    return (
        <div>
            <div className='homescreen__products'>
                { products && products.length > 0? 
                    products.map(product => 
                        <Product
                            key={product.id}
                            product={product} 
                            openModal={openModal}
                        />      
                    )
                :   
                    <div>
                        {favorites.length}!
                        {JSON.stringify(favorites)}
                        {JSON.stringify(products)}
                        <p>You have no favorites at the moment</p>
                    </div>
                }

                {isModalOpen && selectedProduct && (
                    <ProductModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        product={selectedProduct}
                        shouldCloseOnOverlayClick={true}
                    />
                )}

            </div>
        </div>
    );
};

export default Favorite;
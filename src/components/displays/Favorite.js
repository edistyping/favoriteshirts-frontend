import './Favorite.css'

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { api } from '../../utils/api'

import { getProductsByFavorites } from '../../redux/actions/productActions'
import { addFavorite, removeFavorite } from '../../redux/counter/favoritesSlice'

import ProductModal from '../ProductModal'; // Import your Modal component
import { fetchFavorites } from '../../redux/counter/favoritesSlice'

import Product from '../Product'

const Favorite = () => {
    console.log('Favorite here');

    const dispatch = useDispatch();
    
    const user = useSelector(state => state.user);
    const { items: favorites, loaded } = useSelector((state) => state.favorites);
    // const favorites = useSelector((state) => state.favorites.items);

    // Local state for products and loading status
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
    const closeSignUpModal = () => setSignUpModalIsOpen(false);

    useEffect(() => {
        if (favorites.length === 0) {
            // If favorites are empty, no need to fetch products
            setProducts([]);
            return;
        }

        const fetchProductsByFavorites = async () => {
            setLoading(true); // Set loading state to true before fetching
            try {
                const { statusCode, data } = await api.postRequest('/api/favorite/favorite-products'
                    , favorites
                  );
                setProducts(data); // Set products in local state
            } catch (err) {
                setError('Error fetching products');
            } finally {
                setLoading(false); // Set loading state to false after fetching
            }
        };

        fetchProductsByFavorites();
    }, [dispatch]); 
    
    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    // Check if the product is already in favorites
    const handleFavoriteToggle = (productId) => {
        if (favorites.includes(productId)) {
            dispatch(removeFavorite({ productId: productId, isLoggedIn: user.userInfo.isLogin }));
        } else {
            dispatch(addFavorite({ productId: productId, isLoggedIn: user.userInfo.isLogin }));
        }
        // You could update the products state manually here if you need to remove/add from the displayed products
    };

    return (
        <div>
            <div className='favorite__products'>

                {/* Display "Empty!" if favorites list is empty */}
                {favorites.length === 0 && 
                    <div className='favorite__products__empty'>
                        <p>Empty!</p>
                    </div>
                }

                {/* Display "Loading" if products are being fetched */}
                {loading && <p>Loading...</p>}

                {/* Display error message if any */}
                {error && <p>{error}</p>}

                {/* Display the products once fetched */}
                {!loading && products.length > 0 && (
                    products.filter(product => favorites.includes(product.id)).map(product => 
                        <Product
                            key={product.id}
                            product={product} 
                            isFavorite={favorites.includes(product.id)}
                            onToggleFavorite={() => handleFavoriteToggle(product.id)}
                            openModal={openModal}
                        />      
                    )
                )}

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
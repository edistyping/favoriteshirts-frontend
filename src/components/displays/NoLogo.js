import './NoLogo.css'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Product from '../Product'
import FilterBar from '../FilterBar'

import ProductModal from '../ProductModal'; // Import your Modal component

import { addFavorite, removeFavorite } from '../../redux/counter/favoritesSlice'

import { api } from '../../utils/api'
import { current } from '@reduxjs/toolkit'

const NoLogo = () => {
  console.log('   NoLogo component...')
  
  const dispatch = useDispatch()
  
  const user = useSelector(state => state.user);
  const { items: favorites, loaded } = useSelector((state) => state.favorites);
  
  // Local state for products and loading status
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [filter, setFilter] = useState({ brand: "All" });
  const [brands, setBrands] = useState(["All", "Walmart", "Kirkland", "Hanes"]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  
  useEffect(() => {
    console.log('   NoLogo() useEffect...')

    const fetchProducts = async () => {
      console.log('   White() fetchProducts...');
      setLoading(true);
      const { statusCode, data } = await api.getRequest('/api/product/NOLOGO', {
        params: { page, pageSize: 20 }
      });
      
      if (statusCode === 404) {
        setProducts([]);
      } else {
        setProducts(data);
      }

      setLoading(false);
      setHasMore(data.length > 0);
    }
    
    fetchProducts();

  }, [dispatch])

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader.current, hasMore]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleFilter = ( input1 ) => {
    // Called from Filterbar
    setFilter({ brand: input1}); 
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
    <div className="nologo-main-container">

          <div>

            <FilterBar handleFilter={handleFilter} brands={brands} />

            {/* Display "Empty!" if favorites list is empty */}

            {loading && <p style={{color: "red"}}>Loading...</p>}

            { !loading && products.length === 0 && <p>Empty!</p>}

            { !loading && products.length > 0 && 
              <div className='nologo__products'>
                { filter.brand && filter.brand !== "All" ? 
                  products.filter(product => product.brand === filter.brand).map((product, index) => (
                    <Product
                      key={product.id}
                      product={product} 
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={() => handleFavoriteToggle(product.id)}
                      openModal={openModal}
                    />                  
                  ))
                :
                  products.map((product, index) => (
                    <Product
                    key={product.id}
                    product={product} 
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={() => handleFavoriteToggle(product.id)}
                    openModal={openModal}
                    />                  
                  ))
                }
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
            
            <div ref={loader} />
          </div>
    </div>
  )
}

export default NoLogo

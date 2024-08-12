import './White.css'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Product from '../Product'
import FilterBar from '../FilterBar'

import Modal from '../Modal'; // Import your Modal component

import { getProductsByCategory } from '../../redux/actions/productActions'
import { fetchFavorites, addFavorite, removeFavorite } from '../../redux/counter/favoritesSlice'

import { api } from '../../utils/api'
import { current } from '@reduxjs/toolkit'


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
  
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Test FilterBar (Brand)
  const [filter, setFilter] = useState({ brand: "All" });
  const [brands, setBrands] = useState(["All", "Walmart", "Kirkland", "Hanes"]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const { items: favorites, loaded } = useSelector((state) => state.favorites);

  useEffect(() => {
    console.log('   White() useEffect...')
    
    if (products){
      const fetchProducts = async () => {
        console.log('   White() fetchProducts...')
        const { statusCode, data } = await api.getRequest('/api/product/WHITE', {
          params: { page, pageSize: 20 }
        });
        
        if (statusCode === 404) {
          setProducts([]);
        } else {
          setProducts((prev) => [...prev, ...data]);
        }

        setHasMore(data.length > 0);
        dispatch(fetchFavorites(user.userInfo.isLogin));
      };
  
      fetchProducts();
    }

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

  return (
    <div className="white-page-container">
        { !products ? (
          <div>
            <h2>Loading...</h2>
          </div>
        ) : (
          <div>
            
            <FilterBar handleFilter={handleFilter} brands={brands} />
            <div className='white__products'>
              { filter.brand && filter.brand !== "All" ? 
                products.filter(product => product.brand === filter.brand).map((product, index) => (
                  <Product
                  key={product.id}
                  product={product} 
                  openModal={openModal}
                  />                  
                ))
              :
                products.map((product, index) => (
                  <Product
                  key={product.id}
                  product={product} 
                  openModal={openModal}
                  />                  
                ))
              }
              
            
            </div>

            {isModalOpen && selectedProduct && (
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                product={selectedProduct}
                shouldCloseOnOverlayClick={true}
              />
            )}
            
            <div ref={loader} />
          </div>
        )}
    </div>
  )
}

export default White

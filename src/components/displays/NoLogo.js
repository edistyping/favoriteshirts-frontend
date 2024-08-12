import './NoLogo.css'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Product from '../Product'
import FilterBar from '../FilterBar'

import Modal from '../Modal'; // Import your Modal component

import { fetchFavorites } from '../../redux/counter/favoritesSlice'

import { api } from '../../utils/api'
import { current } from '@reduxjs/toolkit'

const NoLogo = () => {
  console.log('   NoLogo component...')
  
  const [products, setProducts] = useState(null);
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
    console.log('   NoLogo() useEffect...')
    
    const fetchProducts = async () => {
      console.log('   NoLogo() fetchProducts...')
      const { statusCode, data } = await api.getRequest('/api/product/NOLOGO', {
        params: { page, pageSize: 20 }
      });
      
      if (statusCode === 404) {
        setProducts([]);
      } else {
        setProducts(data);
      }

      setHasMore(data.length > 0);
      dispatch(fetchFavorites(user.userInfo.isLogin));
    };

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

  return (
    <div className="nologo-main-container">
        { !products ? (
          <div>
            <h2>Loading...</h2>
          </div>
        ) : (
          <div>

            <FilterBar handleFilter={handleFilter} brands={brands} />

            { products.length === 0 ? 
              <p>SORRY! THERE ARE NO ITEMS AT THIS TIME</p>
              :
              <div className='nologo__products'>
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
            }

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

export default NoLogo

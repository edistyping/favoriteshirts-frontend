import './White.css'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Product from '../Product'

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

const NoLogo = () => {
  console.log('   NoLogo component...')
  
  const dispatch = useDispatch()

  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  const user = useSelector(state => state.user)

  // const favorites = useSelector((state) => state.favorites.value)
  const { items: favorites, loaded } = useSelector((state) => state.favorites);

  useEffect(() => {
    console.log('   NoLogo() useEffect...')

    if (products){
      const fetchProducts = async () => {
        console.log('   NoLogo() fetchProducts...')

        const { statusCode, data } = await api.getRequest('/api/product/NOLOGO', {
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
      // dispatch(fetchFavorites(user.userInfo.isLogin));
    }

  }, [user, dispatch])

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


  return (
    <div className="homescreen">
        { !products ? (
          <div>
            <h2>Loading...</h2>
          </div>
        ) : (
          <div>
            <p>{JSON.stringify(user)}</p>
            <p>Favorite: {JSON.stringify(favorites)}</p>

            <div className='homescreen__products'>
              {products.map((product, index) => (
                <div key={index}>
                    <Product
                        key={product.id}
                        id={product.id} 
                        brand={product.brand}
                        description={product.description ? product.description : ""}
                        name={product.name}
                        price={product.price}
                        pack={product.pack}
                        imageUrls={product.imageUrls}
                        productUrls={product.productUrls}
                        features={product.features}
                        maintenance={product.maintenance}
                        category={product.category}
                        tags={product.tag}
                        uploadedBy={product.uploadedBy}
                    />
                  </div>
              ))}
            </div>
            <div ref={loader} />

        </div>
        )}

    </div>
  )
}

export default NoLogo

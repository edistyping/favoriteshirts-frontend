import './Home.css'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Product from './Product'
import { api } from '../utils/api'

const Home = () => {
  console.log('   Home component...')
  
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const { items: favorites, loaded } = useSelector((state) => state.favorites);

  // Local state for products and loading status
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

  useEffect(() => {
    console.log('   Home() useEffect...')

    // fetch top products from backend 
    // display it by category 
    const fetchProducts = async () => {

      console.log('   Home() fetchProducts...')
      setLoading(true);
      
      // const { statusCode, data } = await api.getRequest('/api/product/', {
        //   params: { page, pageSize: 20 }
        // });
        
      const statusCode = 404;
      const data = [];

      if (statusCode === 404) {
        setProducts([]);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }
    
    fetchProducts();

  }, [dispatch])

  return (
    <div className="homescreen">
        
        {/* Display "Empty!" if favorites list is empty */}
        { loading && <p>LOADING!</p>}


        { !loading && <p>WELCOME!</p>}


    </div>
  )
}

export default Home

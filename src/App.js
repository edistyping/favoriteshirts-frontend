import './App.css';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HashRouter } from 'react-router-dom';

import Navbar from './components/Navbar'

import Home from './components/Home'
import White from './components/displays/White'
import Logo from './components/displays/Logo'
import NoLogo from './components/displays/NoLogo'
import Special from './components/displays/Special'
import Favorite from './components/displays/Favorite'
import MyPosts from './components/displays/MyPosts'
import Profile from './components/displays/Profile'

import ProductDetail from './components/ProductDetail'

import Advertise from './components/Advertise'
import Recommendation from './components/Recommendation'
import Post from './components/Post'

import { fetchFavorites } from './redux/counter/favoritesSlice'
import { setUserDetails } from './redux/actions/userAction'

function App() {
  console.log('App()...' + process.env.NODE_ENV);

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Initialize user and favorites whenever the app is loaded
  // products will be loaded when each page is loaded  
  useEffect(() => {
    
    // Check if accessToken is valid, if so sign in the user 
    // dispatch(setUserDetails()) 
    
    const fetchUserAndFavorites = async () => {
      try {
        console.log("   fetchUserAndFavorites() is started...")
        // const result = await dispatch(setUserDetails());
        const result = await dispatch(setUserDetails());
        // console.log(result)
        if (result === true) {
          console.log("   1- setUserDetails is found...")
          await dispatch(fetchFavorites(true)).unwrap();
        } else {
          console.log("   2- setUserDetails is not found...")
          await dispatch(fetchFavorites(false)).unwrap();
        }
        
        console.log("   3- fetchUserAndFavorites() is finished...")
      } catch (error) {
        console.error('Error setting user:', error);
        await dispatch(fetchFavorites(false)).unwrap();        
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserAndFavorites();
    
    // dispatch(fetchFavorites(user.userInfo.isLogin));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div style={{ color: "red" }}>
        LOADING!
      </div>
    )
  }


  return (
    <HashRouter>
      <main>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={ <Home/> } />
          <Route exact path="/white" element={ <White /> } />
          <Route exact path="/nologo" element={ <NoLogo /> } />
          <Route exact path="/logo" element={ <Logo /> } />
          <Route exact path="/special" element={ <Special /> } />

          <Route exact path="/post" element={ <Post/> } />
          <Route exact path="/favorite" element={ <Favorite /> } />
          <Route exact path="/profile" element={ <Profile /> } />

          <Route exact path="/myposts" element={ <MyPosts/> } />

          <Route exact path="/product/:id" element={ <ProductDetail/> } />
          <Route exact path="/recommendation" element={ <Recommendation/> } />
          
          {/*<Route exact path="/advertise" element={ <Advertise/> } />*/}

        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;

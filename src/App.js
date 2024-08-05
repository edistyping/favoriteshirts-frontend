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

import { setInitialFavorites, updateFavorites } from './redux/counter/favoritesSlice'
import { setUserDetails } from './redux/actions/userAction'

function App() {

  console.log('App()...');
  const dispatch = useDispatch()

  // Initialize user and favorites whenever the app is loaded
  // products will be loaded when each page is loaded  
  useEffect(() => {
    // Check if accessToken is valid, if so sign in the user 
    dispatch(setUserDetails()) // Do I need this? 
    
    // dispatch(fetchFavorites()) // Add this to every component
  }, [dispatch]);

  return (
    <HashRouter>
      <Navbar/>
      <main>
        <Routes>
          <Route exact path="/" element={ <Home/> } />
          <Route exact path="/white" element={ <White /> } />
          <Route exact path="/nologo" element={ <NoLogo /> } />
          <Route exact path="/logo" element={ <Logo /> } />
          <Route exact path="/special" element={ <Special /> } />

          <Route exact path="/favorite" element={ <Favorite /> } />
          <Route exact path="/post" element={ <Post/> } />
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

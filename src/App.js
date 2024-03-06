import './App.css';
import { useEffect, useState } from 'react'
import  { useDispatch } from 'react-redux'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HashRouter } from 'react-router-dom';

import Navbar from './components/Navbar'

import Home from './components/Home'
import White from './components/displays/White'
import Logo from './components/displays/Logo'
import NoLogo from './components/displays/NoLogo'
import Special from './components/displays/Special'

import ProductDetail from './components/ProductDetail'

import Advertise from './components/Advertise'
import Recommendation from './components/Recommendation'
import Post from './components/Post'

import { updateFavorites } from './redux/counter/favoritesSlice'
import {setUserDetails} from './redux/actions/userAction'

/* To Do
  1. Create navs 
    - Home, Navbar (plus Profile page and Favorite page)
      Home 
        - Filter Component
          - Gender, Size, Brand, Length, Material
        - Body Component
          - Item Components
          -> Detail Component (page)
      Navbar
        - Home button, Login button&component
          If Logged In, show profile, favorite, and Logout button 
          If not, show Login and favorite (add to sessinoStorage)
*/
function App() {

  console.log('App()...');
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('App() useEffect....')

    const localFavorites = window.localStorage.getItem('favorites')
    dispatch(updateFavorites(JSON.parse(localFavorites)))   

    // dispatch(fetchCart())
    // dispatch(setUserDetails())
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
          <Route exact path="/post" element={ <Post/> } />

          <Route exact path="/product/:id" element={ <ProductDetail/> } />
          <Route exact path="/recommendation" element={ <Recommendation/> } />
          
          {/*<Route exact path="/advertise" element={ <Advertise/> } />*/}

        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;

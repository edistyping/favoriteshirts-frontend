import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { api } from '../../utils/api'

import Product from '../Product'

import { getProductsByCategory } from '../../redux/actions/productActions'

import { updateFavorites, updateFavorites2 } from '../../redux/counter/favoritesSlice'
import { speedDialClasses } from "@mui/material";

const White = ({}) => {
    console.log('White here')
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const response = useSelector(state => state.products)
    const {products, loading, error} = response
    const favorites = useSelector((state) => state.favorites.value)

    useEffect(() => {
        dispatch(getProductsByCategory('WHITE'))
    }, [dispatch])

    useEffect(() => {
        const handleStorageChange = (e) => {
            console.log("wtf")
            console.log(e)
            if (e.key === 'favorites') {
                // Handle changes to cart items
                // Dispatch actions to update Redux state
                var temp = JSON.parse(localStorage.getItem('favorites'))
                console.log(temp)
                dispatch(updateFavorites2()) // Redux/State
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      }, []);


    
    async function handleFavorite(selectedFavorite) {
        // Update localStorage and Redux/State
        console.log('   handleFavorite3()...')
        selectedFavorite = Number(selectedFavorite)

        const isFound = favorites.find((item) => item === selectedFavorite);
        let newFavorites = []

        if (isFound) {
            newFavorites = favorites.filter(favorite => favorite !== selectedFavorite)
        } else {
            newFavorites = [...favorites]
            newFavorites.push(selectedFavorite)
        }
        window.localStorage.setItem('favorites', JSON.stringify(newFavorites))
        dispatch(updateFavorites(newFavorites)) 
    }

    async function handleFavorite2(selectedFavorite) {
        // Update localStorage and Redux/State
        console.log('           handleFavorite()...')
        selectedFavorite = Number(selectedFavorite)
        
        // do separaetly here or update in updateFavorites at the same time?  
        dispatch(updateFavorites2(selectedFavorite)) // Redux/State
    }
    
    async function handleFavorite3(selectedFavorite) {
        // Update localStorage and Redux/State
        console.log('   handleFavorite2()...')
        selectedFavorite = Number(selectedFavorite)
        console.log(selectedFavorite)
        console.log(favorites)

        const isFound = favorites.find((item) => item === selectedFavorite);
        let newFavorites = []
        if (isFound) {
            console.log('       found')            
            newFavorites = favorites.filter(favorite => favorite !== selectedFavorite)
            console.log(newFavorites)
            window.localStorage.setItem('favorites', JSON.stringify(newFavorites))

        } else if (isFound === false) {
            console.log('       not found')
            newFavorites = favorites
            newFavorites.push(selectedFavorite)
            console.log(newFavorites)
            window.localStorage.setItem('favorites', JSON.stringify(newFavorites))
        } else {
            console.log('       first')
            newFavorites = [selectedFavorite]
            console.log(newFavorites)
            window.localStorage.setItem('favorites', JSON.stringify(newFavorites))
        }
        dispatch(updateFavorites2(newFavorites)) // Redux/State
        console.log("--------------------------------")
    }

    return (
        <div>
            <p>{JSON.stringify(user)}</p>
            <p>White here</p>
            <p>This will be available in future</p>
            Here: {JSON.stringify(favorites)}
            <div className='homescreen__products'>
                {products.map(product => (
                    <Product
                        key={product.id}
                        id={product.id}
                        description={product.description ? product.description : ""}
                        name={product.name}
                        price={product.price}
                        pack={product.pack}
                        imageUrls={product.imageUrls}
                        productUrls={product.productUrls}
                        features={product.features}
                        maintenance={product.maintenance}
                        tags={product.tag}
                        uploadedBy={product.uploadedBy}
                        handleFavorite={handleFavorite}
                        user={user}
                    />
                ))}
            </div>
        </div>
    );
};

export default White;
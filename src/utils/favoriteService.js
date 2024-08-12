
import { api } from '../utils/api'

const FavoriteService = {
    getFavorites: async (isLoggedIn) => {
      console.log("   FavoriteService() --> getFavorites()")
      console.log(isLoggedIn)
      if (isLoggedIn) {
        console.log("   (FavoriteService) LOGGED IN")

        const {statusCode, data} = await api.getRequest('/api/favorite');
        if (statusCode === 400 || statusCode === 401 || statusCode === 403 || statusCode === 404 || statusCode === 500) {
          alert("Sorry, error!");
          throw new Error('Failed to add favorite');
        }
        return data; 

      } else {
        console.log("   (FavoriteService) NOT LOGGED IN")

        return FavoriteService.getFavoritesFromLocalStorage();
      }
    },
  
    addFavorite: async (productId, isLoggedIn) => {
      if (isLoggedIn) {
        console.log("   addFavorite() is called...")
        const {statusCode, data} = await api.postRequest('/api/favorite/' + productId, {});
        if (statusCode === 400 || statusCode === 401 || statusCode === 403 || statusCode === 404 || statusCode === 500) {
          alert("Sorry, error!");
          throw new Error('Failed to add favorite');
        }
        return data.productId; 
        
      } else {
        return FavoriteService.addFavoriteToLocalStorage(productId);
      }
    },
  
    removeFavorite: async (productId, isLoggedIn) => {
      if (isLoggedIn) {

        const {statusCode, data} = await api.deleteRequest('/api/favorite/' + productId, {});
        if (statusCode === 400 || statusCode === 401 || statusCode === 403 || statusCode === 404 || statusCode === 500) {
          alert("Sorry, error!");
          throw new Error('Failed to remove favorite');
        }
        return productId; 

        // const response = await fetch(`/api/favorites/${productId}`, {
        //   method: 'DELETE',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        //   }
        // });
        // if (response.ok) {
        //   return productId;
        // }
        // throw new Error('Failed to remove favorite');
      } else {
        return FavoriteService.removeFavoriteFromLocalStorage(productId);
      }
    },
  
    getFavoritesFromLocalStorage: () => {
      console.log(" mokko")
      
      var temp = JSON.parse(localStorage.getItem('favorites')) || [];
      console.log(temp)
      
      return JSON.parse(localStorage.getItem('favorites')) || [];
    },
  
    addFavoriteToLocalStorage: (productId) => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites.push(productId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      return productId;
    },
  
    removeFavoriteFromLocalStorage: (productId) => {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites = favorites.filter(id => id !== productId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      return productId;
    }
  };
  
  export default FavoriteService;
  
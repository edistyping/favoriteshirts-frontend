export const token_key = 'FAVORITESHIRTS_TOKEN'

export const setToken = token => {
  window.localStorage.setItem(token_key, token)
}

export const getToken = () => {
  let token = window.localStorage.getItem(token_key)
  if (!!token) return token
  return ""
}

export const isLogin = () => {
  if (!!getToken()) {
    return true
  }
  return false
}

export const logout = () => {
  window.localStorage.clear()
}

export const setFavorites = favorites => {
  window.localStorage.setItem('favorites', favorites)
}

export const getDefaultFavorites = () => {
  let favorites = window.localStorage.getItem('favorites')
  if (!!favorites) {
    let result = JSON.parse(favorites)
    if (Array.isArray(result)) {
      return result
    }
    else 
      return []
  }
  return []
}
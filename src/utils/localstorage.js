// export const token_key = 'E_COMMERCE_TOKEN'

// export const setToken = token => {
//   window.localStorage.setItem(token_key, token)
// }

// export const getToken = () => {
//   let token = window.localStorage.getItem(token_key)
//   if (!!token) return token
//   return false
// }
// export const isLogin = () => {
//   if (!!getToken()) {
//     return true
//   }
//   return false
// }

// export const logout = () => {
//   window.localStorage.clear()

export const setUser = user => {
  localStorage.setItem('user', user)
}

export const getUser = () => {
  let user = localStorage.getItem('user')
  return user ? JSON.parse(user) : false
}

export const isLogin = () => {
  return getUser() ? true : false
}

export const logout = () => {
  localStorage.clear()
}

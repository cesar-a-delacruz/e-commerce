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

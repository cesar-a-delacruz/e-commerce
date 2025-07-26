function setUser(user) {
  localStorage.setItem("user", user);
}

function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

function logout() {
  localStorage.clear();
}

export { setUser, getUser, logout };

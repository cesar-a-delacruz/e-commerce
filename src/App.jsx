import { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { fetchCart } from "@actions/cartActions";
import { setUser } from "@actions/userActions";
// Components
import Navbar from "@components/Navbar";
import SignUp from "@pages/SignUp";
import SignIn from "@pages/SignIn";
import Home from "@pages/Home";
import Product from "@pages/Product";
import Products from "@pages/Admin/Products";
import New from "@pages/Admin/New";
import Edit from "@pages/Admin/Edit";
import Cart from "@pages/Customer/Cart";
import Profile from "@pages/Customer/Profile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(setUser());
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={Product} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/new" component={New} />
          <Route exact path="/products/:id/edit" component={Edit} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;

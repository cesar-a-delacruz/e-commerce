import { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
import { fetchCart } from "@actions/cartActions";
import { setUser } from "@actions/userActions";
// Components
import Navbar from "@components/Navbar";
import Home from "@pages/Home";
import Product from "@pages/Product";
import Cart from "@pages/Cart";
import SignUp from "@pages/SignUp";
import SignIn from "@pages/SignIn";
import Admin from "@pages/Admin";

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
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;

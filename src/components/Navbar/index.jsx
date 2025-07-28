import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initialize as initUser } from "@actions/userActions";
import { initialize as initCart } from "@actions/cartActions";
import { logout } from "@utils/localstorage";
import "./Navbar.css";

function Navbar() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <nav>
      <div className="logo">
        <h2>C SHOP</h2>
      </div>
      <ul className="links">
        <li>
          <Link to="/">Productos</Link>
        </li>
        {user.details.type === "customer" && (
          <>
            <li>
              <Link to="/cart" className="cart">
                <i className="fas fa-shopping-cart"></i>
                <span>
                  Carrito <span className="badge">{cartSize()}</span>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/profile" className="cart">
                <i className="fas fa-user"></i>
                <span>
                  Perfil
                </span>
              </Link>
            </li>
          </>
        )}
        {user.details.type === "admin" && (
          <li>
            <Link to="/products">Administrar</Link>
          </li>
        )}

        {!user.logged ? (
          <li>
            <Link to="/signin">Entrar</Link>
          </li>
        ) : (
          <li>
            <p onClick={logoutHandler}>Salir</p>
          </li>
        )}
      </ul>
    </nav>
  );

  function cartSize() {
    return cart.items.reduce((amount, item) => Number(item.amount) + amount, 0);
  }
  function logoutHandler() {
    logout();
    dispatch(initCart());
    dispatch(initUser());
    history.replace("/");
  }
}

export default Navbar;

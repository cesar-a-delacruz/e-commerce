import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { countEdit, fetchCart, removeItem } from "@actions/cartActions";
import { getUser } from "@utils/localstorage";
import CartItem from "@components/CartItem";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);

  const user = getUser();
  if (user.type !== "customer") {
    history.replace("/products");
  }

  return (
    <div className="cart-page">
      <div className="left">
        <h2>Carrito</h2>

        {!cart.items.length ? (
          <div>
            Tu carrito esta vacío <Link to="/">Regresar</Link>
          </div>
        ) : (
          cart.items.map((item) => (
            <CartItem
              key={item.product}
              item={item}
              countHandler={countHandler}
              removeHandler={removeHandler}
            />
          ))
        )}
      </div>

      <div className="right">
        <div className="info">
          <p>Subtotal ({getCartCount()}) productos</p>
          <p>${getCartSubtotal()}</p>
        </div>
        <div>
          <button onClick={buyHandler}>Realizar compra</button>
        </div>
      </div>
    </div>
  );

  function countHandler(id, count) {
    dispatch(countEdit(id, count));
    dispatch(fetchCart());
  }
  function removeHandler(id) {
    dispatch(removeItem(id));
    dispatch(fetchCart());
  }
  function getCartCount() {
    return cart.items.reduce((count, item) => Number(item.count) + count, 0);
  }
  function getCartSubtotal() {
    return cart.items
      .reduce((price, item) => price + item.price * item.count, 0)
      .toFixed(2);
  }
  function buyHandler() {
    alert("Funcionalidad pendiente.");
  }
}

export default Cart;

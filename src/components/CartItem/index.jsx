import { Link } from "react-router-dom";
import "./CartItem.css";

function CartItem({ item, amountHandler, removeHandler }) {
  return (
    <div className="cart-item">
      <div className="image">
        <img src={item.image} alt={item.name} />
      </div>
      <Link to={`/product/${item.product}`} className="name">
        {item.name}
      </Link>
      <p className="price">${item.price}</p>
      <select
        value={item.amount}
        onChange={(e) => amountHandler(Number(item.id), Number(e.target.value))}
        className="select"
      >
        {[...Array(Number(item.stock)).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button className="delete" onClick={() => removeHandler(Number(item.id))}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}

export default CartItem;

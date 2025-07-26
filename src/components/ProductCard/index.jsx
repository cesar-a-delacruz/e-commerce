import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ image, description, price, name, id }) {
  return (
    <div className="product">
      <img src={image} alt={name} />

      <div className="info">
        <p className="name">{name}</p>

        <p className="description">{description.substring(0, 100)}...</p>

        <p className="price">${price}</p>

        <Link to={`/product/${id}`} className="button">
          Ver
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;

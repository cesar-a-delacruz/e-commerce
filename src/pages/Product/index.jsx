import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "@actions/productActions";
import { addToCart } from "@actions/cartActions";
import "./Product.css";

function Product({ match, history }) {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const getProduct = useSelector((state) => state.product);
  const { loading, error, product } = getProduct;

  useEffect(() => {
    if (product && match.params.id !== product.id) {
      dispatch(fetchProduct(match.params.id));
    }
  }, []);

  return (
    <div className="product-page">
      {loading ? (
        <h2>Cargando...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="left">
            <div className="image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="info">
              <p className="name">{product.name}</p>
              <p>Precio: ${product.price}</p>
              <p>Descripción: {product.description}</p>
            </div>
          </div>
          <div className="right">
            <div className="info">
              <p>
                Precio:
                <span>${product.price}</span>
              </p>
              <p>
                Estado:
                <span>{product.stock ? "En existencia" : "Agotado"}</span>
              </p>
              <p>
                Cantidad
                <select
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                >
                  {[...Array(product.stock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Agregar al carrito
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );

  function addToCartHandler() {
    if (user.logged) {
      dispatch(addToCart(product.id, count));
      history.push(`/cart`);
      return;
    } else {
      alert("Debes iniciar sesión primero.");
    }
  }
}

export default Product;

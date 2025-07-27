import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "@actions/productActions";
import * as api from "@utils/api";
import "./Edit.css";

function Edit({ match }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const getProduct = useSelector((state) => state.product);
  const { loading, error, product } = getProduct;

  const user = useSelector((state) => state.user);
  if (user.details.type !== "admin") {
    history.replace("/");
  }

  useEffect(() => {
    if (getProduct && match.params.id !== getProduct.id) {
      dispatch(fetchProduct(match.params.id));
    }
  }, []);

  if (loading) return <h1>Cargando...</h1>;
  else
    return (
      <div className="edit-product-page">
        <div className="container">
          <div className="form">
            <div className="header">
              <i
                className="fas fa-arrow-circle-left fa-5x"
                onClick={() => history.push("/products")}
              ></i>
              <p>Editar Producto</p>
            </div>

            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Smith"
              defaultValue={product.name}
            />

            <label htmlFor="email">Descripción</label>
            <textarea
              name="description"
              id="description"
              defaultValue={product.description}
            ></textarea>

            <label htmlFor="price">Precio</label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0.01"
              defaultValue={product.price}
            />

            <label htmlFor="stock">Cantidad</label>
            <input
              type="number"
              id="stock"
              name="stock"
              step="1"
              min="1"
              defaultValue={product.stock}
            />

            <label htmlFor="image">Imagen</label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="John Smith"
              defaultValue={product.image}
            />
            <br />

            <input type="submit" value="Editar" onClick={submitHandler} />
          </div>
        </div>
      </div>
    );

  async function submitHandler() {
    const { statusCode, data } = await api.putRequest("/api/products", {
      id: product.id,
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      price: document.getElementById("price").value,
      stock: document.getElementById("stock").value,
      image: document.getElementById("image").value,
    });
    if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
      alert(data);
      return;
    }
    history.replace("/products");
  }
}

export default Edit;

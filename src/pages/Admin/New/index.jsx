import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as api from "@utils/api";
import "./New.css";

function New() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");

  return (
    <div className="new-product-page">
      <div className="container">
        <div className="form">
          <div className="header">
            <i
              className="fas fa-arrow-circle-left fa-5x"
              onClick={() => history.push("/products")}
            ></i>
            <p>Añadir Producto</p>
          </div>

          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Descripción</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            min="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label htmlFor="stock">Cantidad</label>
          <input
            type="number"
            id="stock"
            name="stock"
            step="1"
            min="1"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <label htmlFor="image">Imagen</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="John Smith"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <br />

          <input type="submit" value="Agregar" onClick={submitHandler} />
        </div>
      </div>
    </div>
  );

  async function submitHandler() {
    if (name.length > 2 && description.length > 2 && price.length > 2) {
      const { statusCode, data } = await api.postRequest("/api/products", {
        name, description, price, stock, image
      });
      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        alert(data);
        return;
      }
      history.replace("/products");
    }
  }
}

export default New;

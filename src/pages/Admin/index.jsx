import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, removeProduct } from "@actions/productActions";
import "./Admin.css";

function Admin() {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.products);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (loading) return <h1>Cargando...</h1>;
  else
    return (
      <>
        <div className="cart-page">
          <div className="content">
            <div className="header">
              <h2>Lista de productos ({getProductCount()})</h2>
              <button>Añadir producto</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.length ? (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <img src={product.image} alt={product.name} />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <div className="buttons">
                          <button className="edit">
                            <i className="fas fa-pen"></i>
                          </button>
                          <button
                            className="delete"
                            onClick={() => dispatch(removeProduct(product.id))}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No hay productos registrados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );

  function getProductCount() {
    return products.reduce(
      (stock, product) => Number(product.stock) + stock,
      0
    );
  }
}

export default Admin;

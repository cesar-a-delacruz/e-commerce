import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, removeProduct } from "@actions/productActions";
import { getUser } from "@utils/localstorage";
import "./Products.css";

function Products() {
  const history = useHistory();
  const user = getUser();
  if (!user || user.type !== "admin") {
    history.replace("/");
  }

  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.products);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <div className="products-page">
        <div className="content">
          <div className="header">
            <h2>Administrar productos ({getProductStock()})</h2>
            <button onClick={() => history.push("/products/new")}>
              Añadir producto
            </button>
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
                        <button
                          className="edit"
                          onClick={async () => {
                            history.push(`/products/${product.id}/edit`);
                          }}
                        >
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

  function getProductStock() {
    return products.reduce(
      (stock, product) => Number(product.stock) + stock,
      0
    );
  }
}

export default Products;

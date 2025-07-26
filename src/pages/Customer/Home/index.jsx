import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@actions/productActions";
import ProductCard from "@components/ProductCard";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.products);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="home-page">
      <h2 className="title">Todos los productos</h2>
      <div className="products">
        {loading ? (
          <h2>Cargando...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              id={product.id}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;

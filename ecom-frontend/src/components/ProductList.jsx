import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "../styles/product.css";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id)); // Update UI after delete
      })
      .catch(error => console.error("Error deleting product:", error));
  };

  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map(product => (
          <ProductCard key={product.id} product={product} onDelete={handleDelete} />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default ProductList;

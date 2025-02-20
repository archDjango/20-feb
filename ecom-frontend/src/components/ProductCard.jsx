import { Link } from "react-router-dom";
import "../styles/product.css";

function ProductCard({ product, onDelete }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <button><Link to={`/edit/${product.id}`}>Edit</Link></button>
      <button onClick={() => onDelete(product.id)} className="delete-btn">Delete</button>
    </div>
  );
}

export default ProductCard;

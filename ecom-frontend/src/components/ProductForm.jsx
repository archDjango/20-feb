import { useState } from "react";
import axios from "axios";
import "../styles/form.css";

const ProductForm = ({ fetchProducts }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/products", product);
    fetchProducts();
    setProduct({ name: "", description: "", price: "", category: "", stock: "" });
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Add Product</h2>
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={product.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={product.description} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={product.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
            </select>
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input type="number" name="stock" value={product.stock} onChange={handleChange} required />
          </div>

          <button type="submit" className="submit-btn">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

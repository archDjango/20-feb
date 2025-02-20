import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: "", description: "", price: "", category: "", stock: "" });

  useEffect(() => {
    axios.get(`http://localhost:4000/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Error fetching product:", error));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:4000/products/${id}`, product)
      .then(() => {
        alert("Product updated successfully");
        navigate("/");
      })
      .catch(error => console.error("Error updating product:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={product.name} onChange={handleChange} required />
      <input type="text" name="description" value={product.description} onChange={handleChange} required />
      <input type="number" name="price" value={product.price} onChange={handleChange} required />
      <input type="text" name="category" value={product.category} onChange={handleChange} required />
      <input type="number" name="stock" value={product.stock} onChange={handleChange} required />
      <button type="submit">Update Product</button>
    </form>
  );
}

export default EditProduct;

import ProductForm from "../components/ProductForm";
import "../styles/form.css";

function AddProduct({ fetchProducts }) {
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Add New Product</h2>
        <ProductForm fetchProducts={fetchProducts} />
      </div>
    </div>
  );
}

export default AddProduct;

import { useEffect, useState } from 'react';
import API from '../api/axios';

function AdminDashboard() {

  const [products, setProducts] = useState([]);

  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    product_name: '',
    price: '',
    description: '',
    image_url: '',
    category: ''
  });

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    const response = await API.get('/products/');

    setProducts(response.data);
  };

  const deleteProduct = async (id) => {
    // CONFIRMATION POPUP
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );

    // IF USER CLICKS CANCEL
    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/products/${id}`);
      alert('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert('Failed to delete product');
    }
};

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const startEdit = (product) => {

    setEditingProduct(product.product_id);

    setFormData({
      product_name: product.product_name,
      price: product.price,
      description: product.description,
      image_url: product.image_url,
      category: product.category
    });
  };

  const updateProduct = async () => {

    await API.put(
      `/products/${editingProduct}`,
      formData
    );

    setEditingProduct(null);

    fetchProducts();
  };

  return (
    <div className="container mt-5">

      <h2>Admin Dashboard</h2>

      <table className="table table-bordered">

        <thead>

          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product.product_id}>

              <td>{product.product_name}</td>

              <td>{product.price}</td>

              <td>

                <button
                  className="btn btn-warning me-2"
                  onClick={() => startEdit(product)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(product.product_id)}
                >
                  Delete
                </button>

              </td>

            </tr>
        ))}

        </tbody>

      </table>

      {editingProduct && (

        <div>

          <h3>Edit Product</h3>

          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            className="form-control mb-2"
            value={formData.product_name}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="form-control mb-2"
            value={formData.price}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            className="form-control mb-2"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            className="form-control mb-2"
            value={formData.image_url}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            className="form-control mb-2"
            value={formData.category}
            onChange={handleChange}
          />

          <button
            className="btn btn-success"
            onClick={updateProduct}
          >
            Update Product
          </button>

        </div>
      )}

    </div>
  );
}

export default AdminDashboard;
import { useEffect, useState } from 'react';
import API from '../api/axios';
import './AdminDashboard.css';

function AdminDashboard() {

  const [products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    product_name: '',
    price: '',
    description: '',
    image_urls: [],
    category: ''
  });
  const [newImages, setNewImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await API.get('/products/');
    setProducts(response.data);
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );

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
      image_urls: product.image_urls || [],
      category: product.category
    });
    setNewImages([]);
    setSelectedImageIndex(0);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingProduct(null);
    setFormData({
      product_name: '',
      price: '',
      description: '',
      image_urls: [],
      category: ''
    });
    setNewImages([]);
    setSelectedImageIndex(0);
  };

  const handleNewImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImagePaths = files.map(file => `/products/${file.name}`);
    setNewImages([...newImages, ...newImagePaths]);
  };

  const removeImage = (index) => {
    const updatedImages = formData.image_urls.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      image_urls: updatedImages
    });
    if (selectedImageIndex >= updatedImages.length && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const removeNewImage = (index) => {
    const updatedNewImages = newImages.filter((_, i) => i !== index);
    setNewImages(updatedNewImages);
  };

  const updateProduct = async () => {
    if (!formData.product_name || !formData.price || !formData.description || !formData.category) {
      alert('Please fill all fields');
      return;
    }

    if (formData.image_urls.length === 0 && newImages.length === 0) {
      alert('Product must have at least one image');
      return;
    }

    try {
      const finalImages = [...formData.image_urls, ...newImages];
      await API.put(
        `/products/${editingProduct}`,
        {
          product_name: formData.product_name,
          price: parseFloat(formData.price),
          description: formData.description,
          image_urls: finalImages,
          category: formData.category
        }
      );
      alert('Product updated successfully');
      closeEditModal();
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert('Failed to update product: ' + error.response?.data?.detail);
    }
  };

  const currentImage = formData.image_urls && formData.image_urls.length > 0
    ? formData.image_urls[selectedImageIndex]
    : null;

  return (
    <div className="container-fluid mt-5 mb-5">
      <h2 className="mb-4">Admin Dashboard - Products</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td className="fw-bold">{product.product_name}</td>
                <td>₹ {product.price}</td>
                <td>{product.category}</td>
                <td>
                  <span className="badge bg-info">
                    {product.image_urls ? product.image_urls.length : 0} images
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => startEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteProduct(product.product_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeEditModal}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row">
                  {/* Image Management Section */}
                  <div className="col-md-6 mb-4">
                    <h6 className="fw-bold mb-3">Product Images</h6>

                    {/* Current Image Preview */}
                    {currentImage && (
                      <div className="current-image-preview mb-3">
                        <img
                          src={currentImage}
                          alt="Current product"
                          className="img-fluid rounded"
                          style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }}
                        />
                        <small className="text-muted d-block mt-2">
                          Image {selectedImageIndex + 1} of {formData.image_urls.length}
                        </small>
                      </div>
                    )}

                    {/* Existing Images List */}
                    {formData.image_urls.length > 0 && (
                      <div className="existing-images mb-3">
                        <label className="form-label fw-bold">Existing Images</label>
                        <div className="images-grid">
                          {formData.image_urls.map((img, index) => (
                            <div
                              key={index}
                              className={`image-thumbnail ${
                                selectedImageIndex === index ? 'active' : ''
                              }`}
                              onClick={() => setSelectedImageIndex(index)}
                              style={{ cursor: 'pointer' }}
                            >
                              <img
                                src={img}
                                alt={`Image ${index + 1}`}
                                className="img-fluid"
                              />
                              <button
                                type="button"
                                className="btn-remove"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage(index);
                                }}
                                title="Delete this image"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add New Images */}
                    <div className="add-images mb-3">
                      <label htmlFor="newImages" className="form-label fw-bold">
                        Add New Images
                      </label>
                      <input
                        type="file"
                        id="newImages"
                        accept="image/*"
                        multiple
                        className="form-control"
                        onChange={handleNewImageSelect}
                      />
                    </div>

                    {/* New Images Preview */}
                    {newImages.length > 0 && (
                      <div className="new-images">
                        <label className="form-label fw-bold">New Images to Upload</label>
                        <div className="images-grid">
                          {newImages.map((img, index) => (
                            <div key={index} className="image-thumbnail">
                              <img
                                src={img}
                                alt={`New Image ${index + 1}`}
                                className="img-fluid"
                              />
                              <button
                                type="button"
                                className="btn-remove"
                                onClick={() => removeNewImage(index)}
                                title="Remove this image"
                              >
                                ✕
                              </button>
                              <span className="badge bg-success position-absolute top-0 start-0">
                                New
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Product Details Section */}
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-3">Product Details</h6>

                    <div className="mb-3">
                      <label htmlFor="product_name" className="form-label">
                        Product Name
                      </label>
                      <input
                        type="text"
                        id="product_name"
                        name="product_name"
                        className="form-control"
                        value={formData.product_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">
                        Price
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Category
                      </label>
                      <input
                        type="text"
                        id="category"
                        name="category"
                        className="form-control"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={updateProduct}
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
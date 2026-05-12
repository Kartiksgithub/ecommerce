import { useState } from 'react';
import API from '../api/axios';
import './CreateProduct.css';

function CreateProduct() {

  const [formData, setFormData] = useState({
    product_name: '',
    price: '',
    description: '',
    image_urls: [],
    category: ''
  });

  const [selectedImages, setSelectedImages] = useState([]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // HANDLE MULTIPLE IMAGE CHANGE
  const handleMultipleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);

    // CREATE IMAGE PATHS
    const imagePaths = files.map(file => `/products/${file.name}`);
    
    setFormData({
      ...formData,
      image_urls: imagePaths
    });
  };

  // REMOVE IMAGE FROM PREVIEW
  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPaths = newImages.map(file => `/products/${file.name}`);
    
    setSelectedImages(newImages);
    setFormData({
      ...formData,
      image_urls: newPaths
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.image_urls.length === 0) {
      alert('Please select at least one image');
      return;
    }

    try {
      // CREATE PRODUCT
      await API.post('/products/', formData);
      alert('Product created successfully');

      // RESET FORM
      setFormData({
        product_name: '',
        price: '',
        description: '',
        image_urls: [],
        category: ''
      });
      setSelectedImages([]);

    } catch (error) {
      console.log(error);
      alert('Failed to create product');
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2>Create Product</h2>

      <form onSubmit={handleSubmit} className="create-product-form">

        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          className="form-control mb-3"
          onChange={handleChange}
          value={formData.product_name}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="form-control mb-3"
          onChange={handleChange}
          value={formData.price}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="form-control mb-3"
          onChange={handleChange}
          value={formData.description}
          required
          rows="4"
        />

        {/* MULTIPLE IMAGE FILE INPUT */}
        <div className="mb-3">
          <label className="form-label fw-bold">Product Images (Multiple)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="form-control mb-3"
            onChange={handleMultipleImageChange}
            required
          />
          <small className="text-muted">You can select multiple images</small>
        </div>

        {/* IMAGE PREVIEW */}
        {selectedImages.length > 0 && (
          <div className="mb-4">
            <h5 className="mb-3">Selected Images Preview:</h5>
            <div className="image-preview-container">
              {selectedImages.map((file, index) => (
                <div key={index} className="image-preview-item">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="preview-image"
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-danger remove-btn"
                    onClick={() => removeImage(index)}
                  >
                    ✕
                  </button>
                  <small className="image-name">{file.name}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CATEGORY */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="form-control mb-3"
          onChange={handleChange}
          value={formData.category}
          required
        />

        <button type="submit" className="btn btn-primary btn-lg w-100">
          Create Product
        </button>

      </form>

    </div>
  );
}

export default CreateProduct;
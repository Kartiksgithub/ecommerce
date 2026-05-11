import { useState } from 'react';
import API from '../api/axios';

function CreateProduct() {

  const [formData, setFormData] = useState({

    product_name: '',

    price: '',

    description: '',

    image_url: '',

    category: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  // HANDLE IMAGE CHANGE

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);

    // CREATE IMAGE PATH
    const imagePath = `/products/${file.name}`;

    setFormData({
      ...formData,
      image_url: imagePath
    });
  };

  // HANDLE SUBMIT

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // CREATE PRODUCT

      await API.post('/products/', formData);

      alert('Product created successfully');

      // RESET FORM

      setFormData({

        product_name: '',

        price: '',

        description: '',

        image_url: '',

        category: ''
      });

      setSelectedImage(null);

    } catch (error) {

      console.log(error);

      alert('Failed to create product');
    }
  };

  return (

    <div className="container mt-5">

      <h2>Create Product</h2>

      <form onSubmit={handleSubmit}>

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
        />

        {/* IMAGE FILE INPUT */}

        <input
          type="file"
          accept="image/*"
          className="form-control mb-3"
          onChange={handleImageChange}
          required
        />

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

        <button className="btn btn-primary">

          Create Product

        </button>

      </form>

    </div>
  );
}

export default CreateProduct;
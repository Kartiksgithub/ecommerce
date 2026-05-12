import { useEffect, useState } from 'react';
import {
  useNavigate
} from 'react-router-dom';
import API from '../api/axios';
import './Products.css';

function Products() {

  const [products, setProducts] = useState([]);
  const [imageIndex, setImageIndex] = useState({});
  const navigate = useNavigate();

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    const response = await API.get('/products/');

    setProducts(response.data);
    
    // Initialize image index for each product
    const indexes = {};
    response.data.forEach(product => {
      indexes[product.product_id] = 0;
    });
    setImageIndex(indexes);
  };

  const buyNow = (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    navigate(`/checkout/${productId}`);
  };

  // Handle next image
  const nextImage = (productId, totalImages) => {
    setImageIndex(prev => ({
      ...prev,
      [productId]: (prev[productId] + 1) % totalImages
    }));
  };

  // Handle previous image
  const prevImage = (productId, totalImages) => {
    setImageIndex(prev => ({
      ...prev,
      [productId]: (prev[productId] - 1 + totalImages) % totalImages
    }));
  };

  return (
    <div
      style={{
        backgroundColor: '#FFF8F3',
        minHeight: '100vh'
      }}
    >

      <div className="container py-5">

        <div className="text-center mb-5">

          <h1
            className="fw-bold"
            style={{
              color: '#5C4033'
            }}
          >
            Handmade Crochet Collection
          </h1>

          <p className="text-muted fs-5">
            Beautiful handmade yarn creations crafted with love.
          </p>

        </div>

        <div className="row">

          {products.map((product) => {
            const currentImageIndex = imageIndex[product.product_id] || 0;
            const currentImage = product.image_urls && product.image_urls.length > 0 
              ? product.image_urls[currentImageIndex] 
              : '/placeholder.png';
            const totalImages = product.image_urls ? product.image_urls.length : 0;

            return (
              <div
                className="col-md-4 mb-4"
                key={product.product_id}
              >

                <div
                  className="card border-0 shadow-lg h-100 product-card"
                  style={{
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >

                  {/* IMAGE CAROUSEL */}
                  <div className="image-carousel-container">
                    <img
                      src={currentImage}
                      alt={product.product_name}
                      className="card-img-top"
                      style={{
                        height: '300px',
                        objectFit: 'cover',
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px'
                      }}
                    />

                    {/* CAROUSEL CONTROLS - Only show if multiple images */}
                    {totalImages > 1 && (
                      <>
                        <button
                          className="carousel-btn carousel-btn-prev"
                          onClick={() => prevImage(product.product_id, totalImages)}
                          title="Previous image"
                        >
                          &#10094;
                        </button>
                        <button
                          className="carousel-btn carousel-btn-next"
                          onClick={() => nextImage(product.product_id, totalImages)}
                          title="Next image"
                        >
                          &#10095;
                        </button>

                        {/* IMAGE INDICATOR DOTS */}
                        <div className="image-indicators">
                          {product.image_urls.map((_, index) => (
                            <div
                              key={index}
                              className={`indicator-dot ${
                                index === currentImageIndex ? 'active' : ''
                              }`}
                              onClick={() => setImageIndex(prev => ({
                                ...prev,
                                [product.product_id]: index
                              }))}
                              title={`Image ${index + 1}`}
                            ></div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="card-body d-flex flex-column">

                    <h4
                      className="fw-bold"
                      style={{
                        color: '#5C4033'
                      }}
                    >
                      {product.product_name}
                    </h4>

                    <p className="text-muted flex-grow-1">
                      {product.description}
                    </p>

                    <h5 className="fw-bold mb-3">
                      ₹ {product.price}
                    </h5>

                    {/* Show image count if multiple images */}
                    {totalImages > 1 && (
                      <small className="text-muted mb-3">
                        {currentImageIndex + 1} / {totalImages} images
                      </small>
                    )}

                    <button
                      className="btn"
                      style={{
                        backgroundColor: '#D4A373',
                        color: 'white',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#b07d4f';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#D4A373';
                        e.target.style.transform = 'scale(1)';
                      }}
                      onClick={() => buyNow(product.product_id)}
                    >
                      Buy Now
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default Products;
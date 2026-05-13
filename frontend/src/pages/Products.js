import { useEffect, useState } from 'react';
import {
  useNavigate
} from 'react-router-dom';
import API from '../api/axios';
import './Products.css';

function Products() {

  const [products, setProducts] = useState([]);
  const [imageIndex, setImageIndex] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    const response = await API.get('/products/');

    setProducts(response.data);

    // Initialize image index
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

  // OPEN PRODUCT MODAL

  const openProductModal = (product) => {

    setSelectedProduct(product);

    setShowModal(true);
  };

  // CLOSE PRODUCT MODAL

  const closeProductModal = () => {

    setShowModal(false);

    setSelectedProduct(null);
  };

  // NEXT IMAGE

  const nextImage = (productId, totalImages) => {

    setImageIndex(prev => ({

      ...prev,

      [productId]:
        (prev[productId] + 1) % totalImages

    }));
  };

  // PREVIOUS IMAGE

  const prevImage = (productId, totalImages) => {

    setImageIndex(prev => ({

      ...prev,

      [productId]:
        (prev[productId] - 1 + totalImages)
        % totalImages

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

            const currentImageIndex =
              imageIndex[product.product_id] || 0;

            const currentImage =
              product.image_urls &&
              product.image_urls.length > 0
                ? product.image_urls[currentImageIndex]
                : '/placeholder.png';

            const totalImages =
              product.image_urls
                ? product.image_urls.length
                : 0;

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
                  onClick={() =>
                    openProductModal(product)
                  }
                  onMouseEnter={(e) => {

                    e.currentTarget.style.transform =
                      'translateY(-10px)';

                    e.currentTarget.style.boxShadow =
                      '0 15px 30px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {

                    e.currentTarget.style.transform =
                      'translateY(0)';

                    e.currentTarget.style.boxShadow =
                      '';
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

                    {/* CONTROLS */}

                    {totalImages > 1 && (

                      <>

                        <button
                          className="carousel-btn carousel-btn-prev"
                          onClick={(e) => {

                            e.stopPropagation();

                            prevImage(
                              product.product_id,
                              totalImages
                            );
                          }}
                          title="Previous image"
                        >
                          &#10094;
                        </button>

                        <button
                          className="carousel-btn carousel-btn-next"
                          onClick={(e) => {

                            e.stopPropagation();

                            nextImage(
                              product.product_id,
                              totalImages
                            );
                          }}
                          title="Next image"
                        >
                          &#10095;
                        </button>

                        {/* INDICATORS */}

                        <div className="image-indicators">

                          {product.image_urls.map(
                            (_, index) => (

                              <div
                                key={index}
                                className={`indicator-dot ${
                                  index ===
                                  currentImageIndex
                                    ? 'active'
                                    : ''
                                }`}
                                onClick={(e) => {

                                  e.stopPropagation();

                                  setImageIndex(prev => ({

                                    ...prev,

                                    [product.product_id]:
                                      index

                                  }));
                                }}
                              ></div>
                            )
                          )}

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

                    <button
                      className="btn"
                      style={{
                        backgroundColor: '#D4A373',
                        color: 'white',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {

                        e.target.style.backgroundColor =
                          '#b07d4f';

                        e.target.style.transform =
                          'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {

                        e.target.style.backgroundColor =
                          '#D4A373';

                        e.target.style.transform =
                          'scale(1)';
                      }}
                      onClick={(e) => {

                        e.stopPropagation();

                        buyNow(product.product_id);
                      }}
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

      {/* PRODUCT MODAL */}

      {/* PRODUCT MODAL */}

{showModal && selectedProduct && (

  <div className="product-modal-overlay">

    <div className="product-modal">

      <button
        className="close-modal-btn"
        onClick={closeProductModal}
      >
        ✕
      </button>

      {/* LEFT IMAGE SECTION */}

      <div className="modal-image-section">

        <img
          src={
            selectedProduct.image_urls &&
            selectedProduct.image_urls.length > 0
              ? selectedProduct.image_urls[
                  imageIndex[selectedProduct.product_id] || 0
                ]
              : '/placeholder.png'
          }
          alt={selectedProduct.product_name}
          className="modal-product-image"
        />

        {/* IMAGE THUMBNAILS */}

        {selectedProduct.image_urls &&
          selectedProduct.image_urls.length > 1 && (

          <div className="thumbnail-container">

            {selectedProduct.image_urls.map(
              (image, index) => (

                <img
                  key={index}
                  src={image}
                  alt={`thumb-${index}`}
                  className={`thumbnail-image ${
                    index ===
                    (imageIndex[selectedProduct.product_id] || 0)
                      ? 'active-thumbnail'
                      : ''
                  }`}
                  onClick={() =>
                    setImageIndex(prev => ({
                      ...prev,
                      [selectedProduct.product_id]: index
                    }))
                  }
                />
              )
            )}

          </div>
        )}

      </div>

      {/* RIGHT CONTENT SECTION */}

      <div className="modal-product-content">

        <h2>
          {selectedProduct.product_name}
        </h2>

        <p className="modal-price">
          ₹ {selectedProduct.price}
        </p>

        <p className="modal-description">
          {selectedProduct.description}
        </p>

        <div className="social-links">

          <a
            href="https://www.instagram.com/poeticart__07?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noreferrer"
            className="social-btn instagram-btn"
          >
            Instagram
          </a>

          <a
            href="https://www.youtube.com/@YarnAlgorithms"
            target="_blank"
            rel="noreferrer"
            className="social-btn youtube-btn"
          >
            YouTube
          </a>

        </div>

        <button
          className="btn buy-modal-btn"
          onClick={() =>
            buyNow(selectedProduct.product_id)
          }
        >
          Buy Now
        </button>

      </div>

    </div>

  </div>

)}

    </div>
  );
}

export default Products;
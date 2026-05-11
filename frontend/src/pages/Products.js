import { useEffect, useState } from 'react';
import {
  useNavigate
} from 'react-router-dom';
import API from '../api/axios';

function Products() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    const response = await API.get('/products/');

    setProducts(response.data);
  };

  const buyNow = (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    navigate(`/checkout/${productId}`);
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

          {products.map((product) => (

            <div
              className="col-md-4 mb-4"
              key={product.product_id}
            >

              <div
                className="card border-0 shadow-lg h-100"
                style={{
                  borderRadius: '20px'
                }}
              >

                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="card-img-top"
                  style={{
                    height: '300px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px'
                  }}
                />

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
                      borderRadius: '12px'
                    }}
                    onClick={() => buyNow(product.product_id)}
                  >
                    Buy Now
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Products;
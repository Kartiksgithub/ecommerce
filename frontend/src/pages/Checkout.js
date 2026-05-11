import {
  useEffect,
  useState
} from 'react';

import {
  useParams,
  useNavigate
} from 'react-router-dom';

import API from '../api/axios';

function Checkout() {

  const { productId } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    address: '',
    pincode: '',
    state: '',
    district: '',
    phone_number: ''
  });

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct = async () => {

    try {

      const response = await API.get('/products/');

      const foundProduct = response.data.find(
        (p) => p.product_id === productId
      );

      setProduct(foundProduct);

    } catch (error) {

      console.log(error);

      alert('Failed to load product');
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const placeOrder = async () => {

    // REQUIRED FIELD VALIDATION

    if (
      !formData.address ||
      !formData.pincode ||
      !formData.state ||
      !formData.district ||
      !formData.phone_number
    ) {

      alert('Please fill all details');

      return;
    }

    // PINCODE VALIDATION

    if (formData.pincode.length !== 6) {
      alert('Pincode must be 6 digits');
      return;
    }

    if (formData.phone_number.length !== 10) {
      alert('Phone number must be 10 digits');
      return;
    }

    try {

      setLoading(true);

      await API.post('/orders/', {
        product_id: productId,
        quantity: parseInt(quantity),
        address: formData.address,
        pincode: parseInt(formData.pincode),
        state: formData.state,
        district: formData.district,
        phone_number: parseInt(formData.phone_number),
      });

      alert('Order placed successfully');

      navigate('/cart');

    } catch (error) {

      console.log(error);

      alert('Failed to place order');

    } finally {

      setLoading(false);
    }
  };

  if (!product) {

    return <h2>Loading...</h2>;
  }

  return (

    <div
      className="container py-5"
      style={{
        maxWidth: '900px'
      }}
    >

      <div className="row shadow-lg p-4 rounded-4 bg-white">

        <div className="col-md-5">

          <img
            src={product.image_url}
            alt={product.product_name}
            className="img-fluid rounded-4"
          />

        </div>

        <div className="col-md-7">

          <h2>{product.product_name}</h2>

          <h4 className="mb-4">
            ₹ {product.price}
          </h4>

          <label className="fw-bold mb-2">
            Quantity
          </label>

          <input
            type="number"
            className="form-control mb-3"
            value={quantity}
            min="1"
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            required
          />

          <h5 className="mb-4">
            Total: ₹ {product.price * quantity}
          </h5>

          <textarea
            name="address"
            placeholder="Full Address"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="pincode"
            placeholder="Pincode"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="district"
            placeholder="District"
            className="form-control mb-4"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="phone_number"
            placeholder="Phone Number"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <button
            className="btn btn-lg w-100"
            style={{
              backgroundColor: '#A26769',
              color: 'white'
            }}
            onClick={placeOrder}
            disabled={loading}
          >

            {loading
              ? 'Placing Order...'
              : 'Place Order'}

          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;
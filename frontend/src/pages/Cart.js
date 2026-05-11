import { useEffect, useState } from 'react';
import API from '../api/axios';

function Cart() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.get('/orders/my-orders');
      setOrders(response.data);
    } catch (error) {
        alert('Please login');
      }
    }

  return (
    <div className="container mt-5">
      <h2>My Orders</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>District</th>
            <th>State</th>
            <th>Phone Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.product_name}</td>
              <td>{order.quantity}</td>
              <td>{order.total_price}</td>
              <td>{order.address}</td>
              <td>{order.pincode}</td>
              <td>{order.district}</td>
              <td>{order.state}</td>
              <td>{order.phone_number}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;

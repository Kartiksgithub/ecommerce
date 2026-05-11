import { useEffect, useState } from 'react';
import API from '../api/axios';

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    const response = await API.get('/orders/');

    setOrders(response.data);
  };

  const updateStatus = async (id, status) => {

    await API.put(`/orders/${id}`, {
      status
    });

    fetchOrders();
  };

  return (
    <div className="container mt-5">

      <h2>Admin Orders</h2>

      <table className="table table-bordered">

        <thead>

          <tr>
            <th>User</th>
            <th>Product</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>State</th>
            <th>District</th>
            <th>Phone Number</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order.order_id}>

              <td>{order.username}</td>
              <td>{order.product_name}</td>
              <td>{order.address}</td>
              <td>{order.pincode}</td>
              <td>{order.state}</td>
              <td>{order.district}</td>
              <td>{order.phone_number}</td>
              <td>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order.order_id,
                      e.target.value
                    )
                  }
                >
                  <option>Pending</option>
                  <option>Packed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminOrders;
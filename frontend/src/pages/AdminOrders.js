import { useEffect, useState } from 'react';
import API from '../api/axios';
import './AdminOrders.css';

function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    status: 'Pending',
    quantity: 0,
    address: '',
    pincode: '',
    district: '',
    state: '',
    phone_number: ''
  });

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    const response = await API.get('/orders/');

    setOrders(response.data);
  };

  const openEditModal = (order) => {
    setEditingOrder(order);
    setFormData({
      status: order.status,
      quantity: order.quantity,
      address: order.address,
      pincode: order.pincode,
      district: order.district,
      state: order.state,
      phone_number: order.phone_number
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingOrder(null);
    setFormData({
      status: 'Pending',
      quantity: 0,
      address: '',
      pincode: '',
      district: '',
      state: '',
      phone_number: ''
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/orders/${editingOrder.order_id}`, {
        status: formData.status,
        quantity: parseInt(formData.quantity),
        address: formData.address,
        pincode: parseInt(formData.pincode),
        district: formData.district,
        state: formData.state,
        phone_number: parseInt(formData.phone_number)
      });
      alert('Order updated successfully');
      closeEditModal();
      fetchOrders();
    } catch (error) {
      alert('Error updating order: ' + error.response?.data?.detail);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await API.delete(`/orders/${orderId}`);
        alert('Order deleted successfully');
        fetchOrders();
      } catch (error) {
        alert('Error deleting order: ' + error.response?.data?.detail);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

      <div className="table-responsive">
        <table className="table table-bordered table-hover">

          <thead>

            <tr>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>State</th>
              <th>District</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order.order_id}>

                <td>{order.username}</td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>₹{order.total_price}</td>
                <td>{order.address}</td>
                <td>{order.pincode}</td>
                <td>{order.state}</td>
                <td>{order.district}</td>
                <td>{order.phone_number}</td>
                <td>

                  <select
                    className="form-select form-select-sm"
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
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => openEditModal(order)}
                    title="Edit order details"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteOrder(order.order_id)}
                    title="Delete order"
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
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Order</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeEditModal}
                ></button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option>Pending</option>
                      <option>Packed</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pincode" className="form-label">
                      Pincode
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="district" className="form-label">
                      District
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone_number" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      required
                    />
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
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminOrders;
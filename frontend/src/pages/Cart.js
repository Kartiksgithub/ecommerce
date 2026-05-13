import { useEffect, useState } from 'react';
import API from '../api/axios';
import './Cart.css';

function Cart() {
  const [orders, setOrders] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
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
    try {
      const response = await API.get('/orders/my-orders');
      setOrders(response.data);
    } catch (error) {
      alert('Please login');
    }
  };

  const openEditModal = (order) => {
    setEditingOrder(order);
    setFormData({
      quantity: order.quantity,
      address: order.address,
      pincode: order.pincode,
      district: order.district,
      state: order.state,
      phone_number: order.phone_number,
      notes: order.notes
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingOrder(null);
    setFormData({
      quantity: 0,
      address: '',
      pincode: '',
      district: '',
      state: '',
      phone_number: '',
      notes: ''
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/orders/${editingOrder.order_id}`, {
        quantity: parseInt(formData.quantity),
        address: formData.address,
        pincode: parseInt(formData.pincode),
        district: formData.district,
        state: formData.state,
        phone_number: parseInt(formData.phone_number),
        notes: formData.notes
      });
      alert('Order updated successfully');
      closeEditModal();
      fetchOrders();
    } catch (error) {
      alert('Error updating order: ' + error.response?.data?.detail);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await API.delete(`/orders/${orderId}`);
        alert('Order cancelled successfully');
        fetchOrders();
      } catch (error) {
        alert('Error cancelling order: ' + error.response?.data?.detail);
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

  return (
    <div className="container mt-5">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="table-responsive">
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
                <th>Order Special Instructions</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.product_name}</td>
                  <td>{order.quantity}</td>
                  <td>₹{order.total_price}</td>
                  <td>{order.address}</td>
                  <td>{order.pincode}</td>
                  <td>{order.district}</td>
                  <td>{order.state}</td>
                  <td>{order.phone_number}</td>
                  <td>{order.notes}</td>
                  <td>
                    <span className={`badge bg-${order.status === 'Pending' ? 'warning' : order.status === 'Delivered' ? 'success' : 'info'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => openEditModal(order)}
                      disabled={order.status === 'Delivered'}
                      title={order.status === 'Delivered' ? 'Cannot edit delivered orders' : 'Edit order'}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteOrder(order.order_id)}
                      disabled={order.status === 'Delivered'}
                      title={order.status === 'Delivered' ? 'Cannot cancel delivered orders' : 'Cancel order'}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                      Order Special Instructions
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
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

export default Cart;

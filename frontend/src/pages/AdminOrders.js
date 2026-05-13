import { useEffect, useState } from 'react';
import API from '../api/axios';
import './AdminOrders.css';

function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [formData, setFormData] = useState({
    status: 'Pending',
    quantity: 0,
    address: '',
    pincode: '',
    district: '',
    state: '',
    phone_number: '',
    notes: '',
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, filterStatus, orders]);

  const fetchOrders = async () => {
    const response = await API.get('/orders/');
    setOrders(response.data);
  };

  const filterOrders = () => {
    let filtered = orders;

    // Filter by status
    if (filterStatus !== 'All') {
      filtered = filtered.filter(order => order.status === filterStatus);
    }

    // Filter by search term (search in username, product name, order id)
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order.username.toLowerCase().includes(term) ||
        order.product_name.toLowerCase().includes(term) ||
        order.order_id.toLowerCase().includes(term)
      );
    }

    setFilteredOrders(filtered);
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
      phone_number: order.phone_number,
      notes: order.notes
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
      phone_number: '',
      notes: ''
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
    try {
      await API.put(`/orders/${id}`, { status });
      fetchOrders();
    } catch (error) {
      alert('Error updating status: ' + error.response?.data?.detail);
    }
  };

  // Calculate statistics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'badge-warning';
      case 'Packed':
        return 'badge-info';
      case 'Shipped':
        return 'badge-primary';
      case 'Delivered':
        return 'badge-success';
      default:
        return 'badge-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return '⏳';
      case 'Packed':
        return '📦';
      case 'Shipped':
        return '🚚';
      case 'Delivered':
        return '✅';
      default:
        return '❓';
    }
  };

  return (
    <div className="admin-orders-container">
      {/* Header Section */}
      <div className="orders-header">
        <div className="header-content">
          <h1 className="page-title">📋 Order Management</h1>
          <p className="page-subtitle">Manage and track all customer orders</p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container-fluid px-4 mt-4">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total-orders">📊</div>
            <div className="stat-content">
              <div className="stat-value">{totalOrders}</div>
              <div className="stat-label">Total Orders</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon total-revenue">💰</div>
            <div className="stat-content">
              <div className="stat-value">₹{totalRevenue.toFixed(0)}</div>
              <div className="stat-label">Total Revenue</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pending-orders">⏳</div>
            <div className="stat-content">
              <div className="stat-value">{pendingOrders}</div>
              <div className="stat-label">Pending Orders</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon delivered-orders">✅</div>
            <div className="stat-content">
              <div className="stat-value">{deliveredOrders}</div>
              <div className="stat-label">Delivered Orders</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container-fluid px-4 mt-5 mb-4">
        <div className="search-filter-container">
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Search by username, product, or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-box">
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Packed</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>

          <div className="results-count">
            Showing <span className="count-badge">{filteredOrders.length}</span> orders
          </div>
        </div>
      </div>

      {/* Orders Table Section */}
      <div className="container-fluid px-4 mb-5">
        <div className="table-card">
          <div className="table-responsive">
            {filteredOrders.length > 0 ? (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Location</th>
                    <th>Instructions</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.order_id} className="order-row">
                      <td className="order-id">
                        <span className="id-badge">{order.order_id.substring(0, 15)}</span>
                      </td>
                      <td className="user-name">{order.username}</td>
                      <td className="product-name">{order.product_name}</td>
                      <td className="quantity">{order.quantity}</td>
                      <td className="total-price">₹{order.total_price}</td>
                      <td className="location">
                        <div className="location-text">
                          {order.district}, {order.state}
                        </div>
                      </td>
                      <td className="notes">{order.notes}</td>
                      <td className="status-cell">
                        <select
                          className={`status-select ${getStatusBadgeClass(order.status)}`}
                          value={order.status}
                          onChange={(e) => updateStatus(order.order_id, e.target.value)}
                        >
                          <option>Pending</option>
                          <option>Packed</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                        </select>
                      </td>
                      <td className="actions-cell">
                        <button
                          className="action-btn edit-btn"
                          onClick={() => openEditModal(order)}
                          title="Edit order"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteOrder(order.order_id)}
                          title="Delete order"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-data">
                <div className="no-data-icon">📭</div>
                <div className="no-data-text">No orders found</div>
                <div className="no-data-subtext">Try adjusting your search or filter criteria</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-dialog-large">
            <div className="modal-content">
              <div className="modal-header-custom">
                <h5 className="modal-title-custom">✏️ Edit Order</h5>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={closeEditModal}
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body-custom">
                  <div className="order-info-section">
                    <h6 className="section-title">Order Information</h6>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Order ID:</span>
                        <span className="info-value">{editingOrder?.order_id}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Customer:</span>
                        <span className="info-value">{editingOrder?.username}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Product:</span>
                        <span className="info-value">{editingOrder?.product_name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h6 className="section-title">Update Details</h6>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                          className="form-control-custom"
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

                      <div className="form-group">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input
                          type="number"
                          className="form-control-custom"
                          id="quantity"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          min="1"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="address" className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control-custom"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="pincode" className="form-label">Pincode</label>
                        <input
                          type="text"
                          className="form-control-custom"
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="district" className="form-label">District</label>
                        <input
                          type="text"
                          className="form-control-custom"
                          id="district"
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="state" className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control-custom"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone_number" className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control-custom"
                          id="phone_number"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="notes" className="form-label">Instructions</label>
                        <input
                          type="text"
                          className="form-control-custom"
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer-custom">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={closeEditModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-save"
                  >
                    💾 Save Changes
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
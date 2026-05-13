import { useEffect, useState } from 'react';
import API from '../api/axios';
import './UserProfile.css';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    phone_number: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get('/auth/profile');
      setProfile(response.data);
      setFormData({
        email: response.data.email,
        phone_number: response.data.phone_number
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to load profile');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.email || !formData.phone_number) {
      setError('All fields are required');
      return;
    }

    if (formData.phone_number.length < 10) {
      setError('Phone number must be at least 10 digits');
      return;
    }

    try {
      const response = await API.put('/auth/profile', formData);
      setProfile(response.data);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      email: profile.email,
      phone_number: profile.phone_number
    });
    setIsEditing(false);
    setError('');
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="profile-page-bg">
      <div className="profile-container">
        <div className="profile-card">
          <h1 className="profile-title">My Profile</h1>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}

          {profile && (
            <>
              {!isEditing ? (
                <div className="profile-view">
                  <div className="profile-field">
                    <label className="field-label">Username</label>
                    <div className="field-value">{profile.username}</div>
                  </div>

                  <div className="profile-field">
                    <label className="field-label">Email</label>
                    <div className="field-value">{profile.email}</div>
                  </div>

                  <div className="profile-field">
                    <label className="field-label">Phone Number</label>
                    <div className="field-value">{profile.phone_number}</div>
                  </div>

                  <button
                    className="btn btn-edit"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>                  
                  
                </div>
              ) : (
                <form className="profile-form" onSubmit={handleSubmit}>
                  <div className="profile-field">
                    <label className="field-label">Username</label>
                    <div className="field-value-readonly">{profile.username}</div>
                    <small className="text-muted">(Username cannot be changed)</small>
                  </div>

                  <div className="profile-field">
                    <label className="field-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="profile-field">
                    <label className="field-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone_number"
                      className="form-control"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      required
                      minLength="10"
                    />
                  </div>

                  <div className="form-buttons">
                    <button
                      type="submit"
                      className="btn btn-save"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-cancel"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: ''
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        '/auth/register',
        formData
      );

      alert('Registration successful');

      navigate('/login');

    } catch (error) {

      alert(error.response.data.detail);
    }
  };

  return (
    <div className="container mt-5">

      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <button className="btn btn-success">
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;
import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link  } from 'react-router-dom';

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
  <div
    className="container d-flex justify-content-center align-items-center"
    style={{ minHeight: '90vh' }}
  >
    <div
      className="p-5 shadow-lg"
      style={{
        width: '100%',
        maxWidth: '450px',
        backgroundColor: '#FFF8F3',
        borderRadius: '25px'
      }}
    >
      <h2
        className="text-center mb-4 fw-bold"
        style={{ color: '#5C4033' }}
      >
        Create Account
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="form-control mb-3"
          onChange={handleChange}
          required
          style={{
            borderRadius: '12px',
            padding: '12px'
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
          required
          style={{
            borderRadius: '12px',
            padding: '12px'
          }}
        />

        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          className="form-control mb-3"
          onChange={handleChange}
          required
          style={{
            borderRadius: '12px',
            padding: '12px'
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-4"
          onChange={handleChange}
          required
          style={{
            borderRadius: '12px',
            padding: '12px'
          }}
        />

        <button
          className="btn w-100"
          style={{
            backgroundColor: '#A26769',
            color: 'white',
            borderRadius: '12px',
            padding: '10px',
            fontWeight: 'bold'
          }}
        >
          Register
        </button>

      </form>

      <p
        className="text-center mt-4"
        style={{ color: '#7A5C4D' }}
      >
        Already have an account?{' '}
        <Link
          to="/login"
          style={{
            color: '#A26769',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}
        >
          Login
        </Link>
      </p>
    </div>
  </div>
);
}

export default Register;
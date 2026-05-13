import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link} from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
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

      const params = new URLSearchParams();

      params.append('username', formData.username);
      params.append('password', formData.password);

      const response = await API.post(
        '/auth/login',
        params
      );

      localStorage.setItem(
        'token',
        response.data.access_token
      );

      localStorage.setItem(
        'role',
        response.data.role
      );

      if (response.data.role === 'admin') {

        navigate('/admin');

      } else {

        navigate('/');
      }

    } catch (error) {

      alert('Invalid credentials');
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
        Welcome Back
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
            backgroundColor: '#D4A373',
            color: 'white',
            borderRadius: '12px',
            padding: '10px',
            fontWeight: 'bold'
          }}
        >
          Login
        </button>

      </form>

      <p
        className="text-center mt-4"
        style={{ color: '#7A5C4D' }}
      >
        Don’t have an account?{' '}
        <Link
          to="/register"
          style={{
            color: '#A26769',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}
        >
          Create Account
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login;
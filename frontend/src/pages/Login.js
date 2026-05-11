import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

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
    <div className="container mt-5">

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="username"
          placeholder="Username"
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

        <button className="btn btn-primary">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;
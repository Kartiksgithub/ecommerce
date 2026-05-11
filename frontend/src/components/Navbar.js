import {
  Link,
  useNavigate
} from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const role = localStorage.getItem('role');

  const logout = () => {

    localStorage.clear();

    navigate('/login');
  };

  return (

    <nav
      className="navbar navbar-expand-lg navbar-dark px-4"
      style={{
        backgroundColor: '#A26769'
      }}
    >

      <Link
        className="navbar-brand fw-bold"
        to="/"
      >
        Yarn Crochet Store
      </Link>

      <div className="navbar-nav ms-auto">

        <Link
          className="nav-link text-white"
          to="/"
        >
          Products
        </Link>

        {/* USER LOGGED IN */}

        {token && role === 'user' && (

          <Link
            className="nav-link text-white"
            to="/cart"
          >
            My Orders
          </Link>
        )}

        {/* ADMIN */}

        {token && role === 'admin' && (

          <>
            <Link
              className="nav-link text-white"
              to="/admin"
            >
              Dashboard
            </Link>

            <Link
              className="nav-link text-white"
              to="/admin/orders"
            >
              Orders
            </Link>

            <Link
              className="nav-link text-white"
              to="/admin/create-product"
            >
              Create Product
            </Link>
          </>
        )}

        {/* NOT LOGGED IN */}

        {!token && (

          <>
            <Link
              className="nav-link text-white"
              to="/login"
            >
              Login
            </Link>

            <Link
              className="nav-link text-white"
              to="/register"
            >
              Register
            </Link>
          </>
        )}

        {/* LOGOUT */}

        {token && (

          <button
            className="btn btn-dark ms-3"
            onClick={logout}
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
import {
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  const token = localStorage.getItem('token');

  const role = localStorage.getItem('role');

  const logout = () => {

    localStorage.clear();

    navigate('/login');
  };

  // ACTIVE TAB STYLE

  const activeStyle = (path) => ({

    color: location.pathname === path
      ? '#FFD6A5'
      : 'white',

    fontWeight:
      location.pathname === path
        ? 'bold'
        : 'normal',

    borderBottom:
      location.pathname === path
        ? '2px solid #FFD6A5'
        : 'none',

    transition: '0.3s',

    paddingBottom: '3px'
  });

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

        {/* PRODUCTS */}

        <Link
          className="nav-link"
          to="/"
          style={activeStyle('/')}
          onMouseEnter={(e) => {
            e.target.style.color = '#FFD6A5';
          }}
          onMouseLeave={(e) => {
            if (location.pathname !== '/') {
              e.target.style.color = 'white';
            }
          }}
        >
          Products
        </Link>

        {/* USER */}

        {token && role === 'user' && (

          <Link
            className="nav-link"
            to="/cart"
            style={activeStyle('/cart')}
            onMouseEnter={(e) => {
              e.target.style.color = '#FFD6A5';
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/cart') {
                e.target.style.color = 'white';
              }
            }}
          >
            My Orders
          </Link>
        )}

        {/* ADMIN */}

        {token && role === 'admin' && (

          <>

            <Link
              className="nav-link"
              to="/admin"
              style={activeStyle('/admin')}
              onMouseEnter={(e) => {
                e.target.style.color = '#FFD6A5';
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/admin') {
                  e.target.style.color = 'white';
                }
              }}
            >
              Dashboard
            </Link>

            <Link
              className="nav-link"
              to="/admin/orders"
              style={activeStyle('/admin/orders')}
              onMouseEnter={(e) => {
                e.target.style.color = '#FFD6A5';
              }}
              onMouseLeave={(e) => {
                if (
                  location.pathname !== '/admin/orders'
                ) {
                  e.target.style.color = 'white';
                }
              }}
            >
              Orders
            </Link>

            <Link
              className="nav-link"
              to="/admin/create-product"
              style={activeStyle('/admin/create-product')}
              onMouseEnter={(e) => {
                e.target.style.color = '#FFD6A5';
              }}
              onMouseLeave={(e) => {
                if (
                  location.pathname !== '/admin/create-product'
                ) {
                  e.target.style.color = 'white';
                }
              }}
            >
              Create Product
            </Link>

          </>
        )}

        {/* NOT LOGGED IN */}

        {!token && (

          <>

            <Link
              className="nav-link"
              to="/login"
              style={activeStyle('/login')}
              onMouseEnter={(e) => {
                e.target.style.color = '#FFD6A5';
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/login') {
                  e.target.style.color = 'white';
                }
              }}
            >
              Login
            </Link>

            <Link
              className="nav-link"
              to="/register"
              style={activeStyle('/register')}
              onMouseEnter={(e) => {
                e.target.style.color = '#FFD6A5';
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/register') {
                  e.target.style.color = 'white';
                }
              }}
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
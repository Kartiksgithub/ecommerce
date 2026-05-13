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
      className="navbar navbar-expand-lg navbar-dark px-3 py-3"
      style={{
        backgroundColor: '#A26769'
      }}
    >

      {/* LOGO */}

      <Link
        className="navbar-brand fw-bold"
        to="/"
        style={{
          fontSize: '1.2rem',
          color: '#fff',
          maxWidth: '70%'
        }}
      >
        Yarn Algorithms ~ Crochet Store
      </Link>

      {/* MOBILE TOGGLER */}

      <button
        className="navbar-toggler border-0 shadow-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* NAVBAR CONTENT */}

      <div
        className="collapse navbar-collapse"
        id="navbarContent"
      >

        <div
          className="navbar-nav ms-auto align-items-lg-center"
          style={{
            gap: '10px'
          }}
        >

          {/* HOME */}

          <Link
            className="nav-link"
            to="/home"
            style={activeStyle('/home')}
            onMouseEnter={(e) => {
              e.target.style.color = '#FFD6A5';
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== '/home') {
                e.target.style.color = 'white';
              }
            }}
          >
            Home
          </Link>

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

            <>

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

              <Link
                className="nav-link"
                to="/profile"
                style={activeStyle('/profile')}
                onMouseEnter={(e) => {
                  e.target.style.color = '#FFD6A5';
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/profile') {
                    e.target.style.color = 'white';
                  }
                }}
              >
                My Profile
              </Link>

            </>
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
          )}

          {/* LOGOUT */}

          {token && (

            <button
              className="btn ms-lg-3 mt-2 mt-lg-0"
              onClick={logout}
              style={{
                backgroundColor: '#5C4033',
                color: 'white',
                borderRadius: '12px',
                padding: '8px 18px',
                border: 'none',
                transition: '0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#3E2723';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#5C4033';
              }}
            >
              Logout
            </button>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
import {
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaEnvelope
} from 'react-icons/fa';

function Home() {

  return (

    <div>

      {/* HERO SECTION */}

      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/products/crochet_home_page.jpg')",

          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '40px'
        }}
      >
        <div>

          <h1
            style={{
              fontSize: '4rem',
              fontWeight: 'bold'
            }}
          >
            Mitali Gandhi
          </h1>

          <h3 className="mb-4">
            Software Developer & Crochet Artist
          </h3>

          <p
            style={{
              maxWidth: '800px',
              margin: 'auto',
              fontSize: '1.2rem',
              lineHeight: '2'
            }}
          >
            Professionally, I am a Software Developer.
            But crocheting is my passion and creative
            escape. Every handmade crochet piece is
            created with love, patience, and attention
            to detail.
            
            I take customized crochet orders including
            flowers, bouquets, keychains, home decor,
            gifts, and many more beautiful handmade
            creations.
          </p>

        </div>

      </div>

      {/* ABOUT SECTION */}

      <div className="container py-5">

        <div className="row align-items-center">

          <div className="col-md-6 mb-4">

            <img
              src="/products/all_product.png"
              alt="Crochet"
              className="img-fluid rounded-4 shadow-lg"
            />

          </div>

          <div className="col-md-6">

            <h2
              className="mb-4"
              style={{
                color: '#A26769',
                fontWeight: 'bold'
              }}
            >
              Handmade With Love
            </h2>

            <p
              style={{
                lineHeight: '2',
                fontSize: '1.1rem'
              }}
            >
              Crochet is not just a business for me.
              It is an emotion and an art that turns
              simple yarn into meaningful handmade
              creations.
            </p>

            <p
              style={{
                lineHeight: '2',
                fontSize: '1.1rem'
              }}
            >
              Every order is carefully handcrafted.
              I also take customized orders based on
              your favorite colors, designs, themes,
              and gifting occasions.
            </p>

            <p
              style={{
                lineHeight: '2',
                fontSize: '1.1rem'
              }}
            >
              Whether you are looking for something
              cute, aesthetic, or unique — you are at
              the right place.
            </p>

          </div>

        </div>

      </div>

      {/* CONTACT SECTION */}

      <div
        className="py-5"
        style={{
          backgroundColor: '#FFF5F5'
        }}
      >

        <div className="container text-center">

          <h2
            className="mb-4"
            style={{
              color: '#A26769',
              fontWeight: 'bold'
            }}
          >
            Contact Me
          </h2>

          <p className="mb-5 fs-5">
            For customized crochet orders,
            collaborations, or any queries,
            feel free to connect with me.
          </p>

          <div className="row justify-content-center g-4">

            {/* WHATSAPP */}

            <div className="col-md-3">

              <a
                href="https://wa.me/9923468756"
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'none'
                }}
              >

                <div
                  className="card shadow border-0 p-4 h-100"
                  style={{
                    borderRadius: '20px',
                    transition: '0.3s'
                  }}
                >

                  <FaWhatsapp
                    size={45}
                    color="#25D366"
                    className="mb-3 mx-auto"
                  />

                  <h5>WhatsApp</h5>

                  <p className="text-muted">
                    +91 9923468756
                  </p>

                </div>

              </a>

            </div>

            {/* INSTAGRAM */}

            <div className="col-md-3">

              <a
                href="https://www.instagram.com/poeticart__07?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'none'
                }}
              >

                <div
                  className="card shadow border-0 p-4 h-100"
                  style={{
                    borderRadius: '20px'
                  }}
                >

                  <FaInstagram
                    size={45}
                    color="#E1306C"
                    className="mb-3 mx-auto"
                  />

                  <h5>Instagram</h5>

                  <p className="text-muted">
                    @poeticart__07
                  </p>

                </div>

              </a>

            </div>

            {/* YOUTUBE */}

            <div className="col-md-3">

              <a
                href="https://www.youtube.com/@YarnAlgorithms"
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'none'
                }}
              >

                <div
                  className="card shadow border-0 p-4 h-100"
                  style={{
                    borderRadius: '20px'
                  }}
                >

                  <FaYoutube
                    size={45}
                    color="#FF0000"
                    className="mb-3 mx-auto"
                  />

                  <h5>YouTube</h5>

                  <p className="text-muted">
                    Yarn Algorithms
                  </p>

                </div>

              </a>

            </div>

            {/* EMAIL */}

            <div className="col-md-3">

              <a
                href="mailto:mkwebdesign21@gmail.com"
                style={{
                  textDecoration: 'none'
                }}
              >

                <div
                  className="card shadow border-0 p-4 h-100"
                  style={{
                    borderRadius: '20px'
                  }}
                >

                  <FaEnvelope
                    size={45}
                    color="#A26769"
                    className="mb-3 mx-auto"
                  />

                  <h5>Email</h5>

                  <p className="text-muted">
                    mkwebdesign21@gmail.com
                  </p>

                </div>

              </a>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;
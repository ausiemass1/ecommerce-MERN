import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="page-footer grey darken-4">
      <div className="container">
        <div className="row">
          {/* Brand / About */}
          <div className="col s12 m4">
            <h5 className="white-text">E-Commerce</h5>
            <p className="grey-text text-lighten-4">
              Fresh food, fast delivery, and secure payments.
            </p>
          </div>

          {/* Important Links */}
          <div className="col s12 m4">
            <h5 className="white-text">Quick Links</h5>
            <ul>
              <li>
                <Link className="grey-text text-lighten-3" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="grey-text text-lighten-3" >
                  Contact
                </Link>
              </li>
              <li>
                <Link className="grey-text text-lighten-3" to="#!">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="grey-text text-lighten-3" to="#!">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col s12 m4">
            <h5 className="white-text">Legal</h5>
            <ul>
              <li>
                <Link className="grey-text text-lighten-3" to="#!">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="grey-text text-lighten-3" to="#!">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link className="grey-text text-lighten-3" to="#!">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-copyright">
        <div className="container center-align">
          © {new Date().getFullYear()} E-Commerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

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
                <li><a className="grey-text text-lighten-3" href="#!">About Us</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Contact</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">FAQ</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Careers</a></li>
              </ul>
            </div>
  
            {/* Legal */}
            <div className="col s12 m4">
              <h5 className="white-text">Legal</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" href="#!">Privacy Policy</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Terms & Conditions</a></li>
                <li><a className="grey-text text-lighten-3" href="#!">Refund Policy</a></li>
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
  
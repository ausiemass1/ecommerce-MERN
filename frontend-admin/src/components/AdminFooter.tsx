const AdminFooter = () => {
    return (
      <footer
        className="page-footer grey darken-3"
        style={{ paddingTop: "10px" }}
      >
        <div className="container">
          <div className="row" style={{ marginBottom: 0 }}>
            <div className="col s12 m6">
              <span className="grey-text text-lighten-3">
                Admin Panel
              </span>
            </div>
  
            <div className="col s12 m6 right-align">
              <span className="grey-text text-lighten-3">
                © {new Date().getFullYear()} Your Store
              </span>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default AdminFooter;
  
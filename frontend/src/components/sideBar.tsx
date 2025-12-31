import { useEffect} from "react";
import M from "materialize-css"

const Sidebar = () => {

      useEffect(() => {
        const elems = document.querySelectorAll(".collapsible");
        M.Collapsible.init(elems, {
          accordion: false
        });
      }, []);
      return (
        <ul className="collapsible">
          <li>
            <div className="collapsible-header">
              <i className="material-icons">restaurant</i>
              Food
            </div>
    
            <div className="collapsible-body">
              <ul className="collection">
                <li className="collection-item">All Day Menu</li>
                <li className="collection-item">Breakfast</li>
                <li className="collection-item">Burgers</li>
                <li className="collection-item">Beef</li>
                <li className="collection-item">Chicken & Fish</li>
                <li className="collection-item">Salads & Wraps</li>
                <li className="collection-item">Sides</li>
                <li className="collection-item">Happy Meal</li>
              </ul>
            </div>
          </li>
    
          <li>
            <div className="collapsible-header">
              <i className="material-icons">local_offer</i>
              Bundles & Offers
            </div>
            <div className="collapsible-body">
              <span>Offers content</span>
            </div>
          </li>
    
          <li>
            <div className="collapsible-header">
              <i className="material-icons">local_drink</i>
              Drinks
            </div>
            <div className="collapsible-body">
              <span>Drinks content</span>
            </div>
          </li>
    
          <li>
            <div className="collapsible-header">
              <i className="material-icons">icecream</i>
              Desserts
            </div>
            <div className="collapsible-body">
              <span>Desserts content</span>
            </div>
          </li>
        </ul>
      );
  };
  
  export default Sidebar;
  
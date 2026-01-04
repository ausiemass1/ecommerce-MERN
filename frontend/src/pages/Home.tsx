import ProductCard from "../components/ProductCard";
import Sidebar from "../components/sideBar";
import { useEffect, useState } from "react";
import { type Product } from "../types/Product";
import Hero from "../components/Hero";
import axios from "axios"


function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
      .then(res => setProducts(res.data));
  }, []);
  return (
    <div className="">
<Hero/><br /><br />
      <div className="row">
        
        {/* Sidebar */}
        <div className="col s12 m3">
          <Sidebar />
        </div>

        {/* Products */}
        <div className="col s12 m9">
          <div className="row">
            {products.map(product => (
              <ProductCard
                product={product}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
  }
  
  export default Home;
  
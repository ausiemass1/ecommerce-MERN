


import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Register from "./pages/register";
import  Login  from "./pages/Login";
import  Navbar  from "./components/NavBar";
import Footer from "./components/Footer"

function App() {
  return (
    < >
    <div className="app-layout">
    <Navbar/>
    <main className="main-content">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/footer" element={<Footer/>}/>
    </Routes>
    </main>
    <Footer/>
    </div>
    </>
  );
}

export default App;

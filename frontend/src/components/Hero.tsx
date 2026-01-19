import { useEffect, useRef } from "react";
import M from "materialize-css";

const Hero = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!carouselRef.current) return;

    M.Carousel.init(carouselRef.current, {
      fullWidth: true,
      indicators: true,
      duration: 200,
    });

    // Auto-slide
    const interval = setInterval(() => {
      const instance = M.Carousel.getInstance(carouselRef.current!);
      instance?.next();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">
      {/* TODO: Replace with actual images from client */}
      {/* TODO: Refactor into separate component */}
      <div ref={carouselRef} className="carousel carousel-slider hero-carousel">
        {/* SLIDE 1 */}
        <div
          className="carousel-item hero-slide"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1550547660-d9450f859349')",
          }}
        >
          <div className="hero-overlay center">
            <div className="container">
              <h1 className="hero-title">Order Your Favourites</h1>
              <p className="hero-subtitle">
                Fresh, fast, and delivered to your door
              </p>
              <button className="btn-large red darken-1">
                Order Now
              </button>
            </div>
          </div>
        </div>

        {/* SLIDE 2 */}
        <div
          className="carousel-item hero-slide"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
          }}
        >
          <div className="hero-overlay center">
            <div className="container">
              <h1 className="hero-title">Hot Meals, Fast Delivery</h1>
              <p className="hero-subtitle">
                Straight from the kitchen to you
              </p>
              <button className="btn-large red darken-1">
                Browse Menu
              </button>
            </div>
          </div>
        </div>

        {/* SLIDE 3 */}
        <div
          className="carousel-item hero-slide"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1525755662778-989d0524087e')",
          }}
        >
          <div className="hero-overlay center">
            <div className="container">
              <h1 className="hero-title">Deals You’ll Love</h1>
              <p className="hero-subtitle">
                Save more on your favourite meals
              </p>
              <button className="btn-large red darken-1">
                View Offers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import React from "react";
import { Navbar, Main, Product, Footer } from "../components";

function Home() {
  const scrollToProduct = () => {
    const productSection = document.getElementById("productSection");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="hero border-1 pb-3"
        onClick={scrollToProduct}
        style={{ cursor: "pointer" }} // Added style prop for cursor
      >
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/cover.png"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              {/* Add your cover content here if needed */}
            </div>
          </div>
        </div>
      </div>
      <Main />
      <div id="productSection">
        <Product />
      </div>
      <Footer />
    </>
  );
}

export default Home;

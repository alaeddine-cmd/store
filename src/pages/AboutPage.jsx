import React from 'react'
import { Footer, Navbar } from "../Components";
import mens from "../Components/mens.jpg";
import women from "../Components/women.jpeg";
import './AboutPage.css'

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center about-us-text">
          At Stitch Switch, we specialize in crafting high-quality embroidered clothing for both men and women. With meticulous attention to detail, we bring your designs to life on hoodies, shirts, and more. Our passion lies in creating unique pieces that reflect your individual style. Whether you're looking for a standout piece to elevate your wardrobe or seeking the perfect canvas for your brand's logo, we've got you covered. Our custom embroidery service allows you to add a personal touch to your apparel, making each piece truly one-of-a-kind. At Stitch Switch, we understand the importance of quality, creativity, and attention to detail. Let us help you make a statement with our expert embroidery services. Explore the possibilities and express yourself with confidence.
        </p>

        <h2 className="text-center py-4">Our Products</h2>
        <div className="row">
          <div className="col-md-6 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src={mens} alt="Men's Clothing" style={{ maxWidth: '100%', height: 'auto' }} />
              <div className="card-body">
                <h5 className="card-title text-center">Men's Clothing</h5>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src={women} alt="Women's Clothing" style={{ maxWidth: '100%', height: 'auto' }} />
              <div className="card-body">
                <h5 className="card-title text-center">Women's Clothing</h5>
              </div>
            </div>
          </div>
        </div>


      </div>
      <Footer />
    </>
  )
}

export default AboutPage
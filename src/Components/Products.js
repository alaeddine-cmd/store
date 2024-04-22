import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import './Products.css'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [imageIndex, setImageIndex] = useState({});
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/products");
      if (componentMounted) {
        const productsData = await response.clone().json();
        setData(productsData);
        setFilter(productsData);
        // Initialize image index state for each product
        const indexData = {};
        productsData.forEach((product) => {
          indexData[product.id] = 0;
        });
        setImageIndex(indexData);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
            <Skeleton height={592} />
          </div>
        ))}
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const handleNextImage = (productId) => {
    setImageIndex((prevIndex) => {
      const newIndex = { ...prevIndex };
      newIndex[productId] =
        (newIndex[productId] + 1) % filter.find((item) => item.id === productId).images.length;
      return newIndex;
    });
  };

  const handlePrevImage = (productId) => {
    setImageIndex((prevIndex) => {
      const newIndex = { ...prevIndex };
      newIndex[productId] =
        (newIndex[productId] - 1 + filter.find((item) => item.id === productId).images.length) %
        filter.find((item) => item.id === productId).images.length;
      return newIndex;
    });
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? (
            <Loading />
          ) : (
            filter.map((product) => (
              <div key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                <div className="card text-center h-100">
                  <div className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      {product.images.map((image, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${index === imageIndex[product.id] ? "active" : ""}`}
                        >
                          <img
                            className="product-image"
                            src={image.url}
                            alt={image.alt || "Product"}
                            height={300}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#carousel${product.id}`}
                      data-bs-slide="prev"
                      onClick={() => handlePrevImage(product.id)}
                    >
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carousel${product.id}`}
                      data-bs-slide="next"
                      onClick={() => handleNextImage(product.id)}
                    >
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text">
                      {product.description.substring(0, 90)}...
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">TND {product.price}</li>
                  </ul>
                  <div className="card-body">
                    <Link to={"/product/" + product.id} className="btn btn-dark m-1">
                      Buy Now
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => addProduct(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Products;

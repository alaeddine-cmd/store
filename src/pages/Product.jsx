import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import { Footer, Navbar } from "../Components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);

        // Fetch similar products based on category
        const response2 = await fetch(
          `http://localhost:8080/api/products?category=${data.category}`
        );
        const data2 = await response2.json();
        setSimilarProducts(data2);
        setLoading2(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
        setLoading2(false);
      }
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        {/* Your loading skeleton code */}
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        {/* Your product display code */}
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        {/* Your loading skeleton code for similar products */}
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
      {similarProducts.map((item) => (
        <div key={item.id} className="card mx-4 text-center">
          {console.log(item.images)} {/* Log item.images to inspect its structure */}
          {item.images && item.images.length > 0 ? (
            <img
              className="card-img-top p-3"
              src={item.images[0].url}
              alt="Card"
              height={300}
              width={300}
            />
          ) : (
            <p>No image available</p>
          )}
          {/* Your other similar product details */}
        </div>
      ))}
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">You may also Like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;

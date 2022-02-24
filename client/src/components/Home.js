import React, { useEffect, useState } from "react";
import { showLoading } from "../helpers/loading";
import Card from "./Card";
import { getNewArrivals } from "../redux/actions/filterActions";
import { getProductsByCount } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewArrivals());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsByCount());
  }, [dispatch]);

  const { newArrivals } = useSelector((state) => state.filters);
  const { products } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.loading);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);

  // Get current product items
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="home-page">
      <div className="banner-image mt-5"></div>
      {loading ? (
        <div className="text-center">{showLoading()}</div>
      ) : (
        <>
          <div className="container">
            <hr className="py-4" />
            <h3 className="py-4">Menu</h3>
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={products.length}
              paginate={paginate}
            />
            <div className="row">
              {products &&
                currentProducts.map((product) => (
                  <Card key={product._id} product={product} homePage={true} />
                ))}
            </div>
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={products.length}
              paginate={paginate}
            />
            <hr className="py-4" />
            <h3 className="py-4">New Vegan Food Items</h3>
            <div className="row">
              {newArrivals &&
                newArrivals.map((newArrival) => (
                  <Card
                    key={newArrival._id}
                    product={newArrival}
                    homePage={true}
                  />
                ))}
            </div>
            <br />
            <br />
            <br />
            <br />
          </div>
        </>
      )}
    </section>
  );
};

export default Home;

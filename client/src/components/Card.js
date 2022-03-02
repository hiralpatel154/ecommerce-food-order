import React from "react";
import { Link } from "react-router-dom";
// redux
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
import "./Card.css";

const Card = ({ product, adminPage = false, homePage = false }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="col-md-3 my-3 d-flex justify-content-center">
      <div className="card border-dark card-rel" style={{ width: "17rem",height:"30rem" }}>
        <a href="#!">
          <img
            className="img-fluid card-img-top card-ab"
            src={`/uploads/${product.fileName}`}
            alt="product"
          />
        </a>

        <div className="card-body text-center card-product-name">
          <h5>{product.productName}</h5>
          <hr />
          <h6 className="mb-3">
            <span className="text-secondary mr-2">
              {product.productPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </h6>
          <p className="text-muted">
            {product.productQty <= 0 ? "Out of Stock" : "In Stock"}
          </p>
          <p className="card-desc">
            {product.productDesc.length > 60
              ? product.productDesc.substring(0, 60) + "..."
              : product.productDesc.substring(0, 60)}
          </p>
          {adminPage && (
            <>
              <Link
                to={`/admin/edit/product/${product._id}`}
                type="button"
                className="btn btn-secondary btn-sm mr-1 my-1"
              >
                <i className="far fa-edit pr-1"></i>
                Edit
              </Link>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => dispatch(deleteProduct(product._id))}
              >
                <i className="far fa-trash-alt pr-1"></i>
                Delete
              </button>
            </>
          )}

          {homePage && (
            <>
              <Link
                to={`/product/${product._id}`}
                type="button"
                className="btn btn-primary btn-sm mr-1 my-1"
              >
                View Product
              </Link>
              <button
                type="button"
                className="btn btn-warning btn-sm"
                disabled={product.productQty <= 0}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

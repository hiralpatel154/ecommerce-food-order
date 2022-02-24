import React from "react";
import Card from "./Card";
import { showLoading } from "../helpers/loading";
// redux
import { useSelector } from "react-redux";

const AdminBody = () => {
  const { products } = useSelector((state) => state.products);
   const { loading } = useSelector((state) => state.loading);

  return (
    <div className="container">
      {loading ? (
        <div className="text-center">{showLoading()}</div>
      ) : (
        <div className="row">
          {products &&
            products.map((product) => (
              <Card key={product._id} product={product} adminPage={true} />
            ))}
        </div>
      )}
    </div>
  );
};	

export default AdminBody;

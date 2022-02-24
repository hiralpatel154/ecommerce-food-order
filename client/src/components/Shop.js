import React, { useEffect, useState, Fragment } from 'react';
import { showLoading } from "../helpers/loading";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import { getCategories } from '../redux/actions/categoryActions';
import { getProductsByFilter } from '../redux/actions/filterActions';
import Card from "./Card";

const Shop = () => {
  const [text, setText] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
    const { loading } = useSelector((state) => state.loading);

  const handleSearch = (e) => {
    resetState();

    setText(e.target.value);

    dispatch(getProductsByFilter({ type: "text", query: e.target.value }));
  };

  const handleCategory = (e) => {
    resetState();

    const currentCategoryChecked = e.target.value;
    const allCategoriesChecked = [...categoryIds];
    const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);

    let updatedCategoryIds;
    if (indexFound === -1) {
      // add
      updatedCategoryIds = [...categoryIds, currentCategoryChecked];
      setCategoryIds(updatedCategoryIds);
    } else {
      // remove
      updatedCategoryIds = [...categoryIds];
      updatedCategoryIds.splice(indexFound, 1);
      setCategoryIds(updatedCategoryIds);
    }

    dispatch(
      getProductsByFilter({ type: "category", query: updatedCategoryIds })
    );
  };

  const resetState = () => {
    setText("");
    setCategoryIds([]);
  };

  return (
    <section className="shop-page m-4">
      {loading ? (
        <div className="text-center">{showLoading()}</div>
      ) : (
        <Fragment>
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center">
              <div className="text-muted mt-0">
                <h3>
                  Filters <span className="fas fa-sliders-h"></span>
                </h3>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center">
              <nav className="navbar-expand-lg navbar-light bg-light border-top pt-2 pb-2">
                <form className="form-inline my-2 my-lg-0">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    name="search"
                    value={text}
                    onChange={handleSearch}
                  />
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                    disabled={true}
                  >
                    Search
                  </button>
                </form>
              </nav>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center mx-0">
              <div className="border-top border-bottom bg-light p-3">
                {categories &&
                  categories.map((c) => (
                    <div key={c._id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="category"
                        value={c._id}
                        id="flexCheckChecked"
                        checked={categoryIds.includes(c._id)}
                        onChange={handleCategory}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        {c.category}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-md-12 mx-2">
              <div className="row">
                {products &&
                  products.map((p) => (
                    <Card key={p._id} product={p} homePage={true} />
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default Shop;
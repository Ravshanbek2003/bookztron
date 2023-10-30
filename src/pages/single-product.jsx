import "./single-product.scss";
import PropTypes from "prop-types";

import { instance } from "@/utils/use-request";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function SingleProduct({
  handleLikeBtnClick,
  products,
  setCardId,
  setCountCard,
  setLocal,
}) {
  const [product1, setProduct] = useState(null);
  const [dis, setDis] = useState(false);
  const [dis1, setDis1] = useState(false);
  const { productID } = useParams();
  const product2 = useLocation().pathname.slice(9);
  useEffect(() => {
    (async () => {
      const data = await instance.get("/home/newarrivals");
      let card = await data.data?.newArrivalList?.filter(
        (el) => el._id === productID
      );
      if (card) {
        const data = await instance.get("/home/products");
        card = await data.data?.productsList?.filter(
          (el) => el._id === productID
        );
        // setProducts(data.data?.productsList);
      }
      if (card?.length === 0) {
        card = await products?.filter((el) => el._id === productID);
      }
      setProduct(card);
    })();
  }, [productID]);

  return (
    <div className="handle_single_product">
      {/* <h1>Single Product</h1> */}
      {product1 ? (
        <div className="product-page-container">
          <div className="product-page-item">
            <img
              className="bookcover-image"
              src={product1[0].imgSrc}
              alt={product1[0].imgAlt}
            ></img>
            <div className="item-details">
              <h2>{product1[0].bookName}</h2>
              <hr></hr>
              <p>
                <b>Author : </b> &nbsp;&nbsp; <span>{product1[0].author}</span>{" "}
              </p>
              <p className="item-description">
                <b>Description : </b> &nbsp;&nbsp;{" "}
                <span>{product1[0].description}</span>{" "}
              </p>
              <p className="item-rating">
                <b>Rating : </b> &nbsp;&nbsp; <span>{product1[0].rating}</span>{" "}
              </p>
              <h3 className="item-price-details">
                Rs. {product1[0].discountedPrice} &nbsp;&nbsp;
                <del>Rs. {product1[0].originalPrice}</del> &nbsp;&nbsp;
                <span className="discount-on-item">
                  ({product1[0].discountPercent}% off)
                </span>
              </h3>
              <div className="item-buttons">
                <button
                  disabled={dis1}
                  onClick={() => {
                    setDis1(true);
                    handleLikeBtnClick(product1[0]._id);
                  }}
                  className="solid-primary-btn"
                >
                  Add to wishlist
                </button>
                <button
                  disabled={dis}
                  onClick={() => {
                    setDis(true);
                    setCardId(product2);
                    setCountCard((prev) => prev + 1);
                    setLocal((local) => local + 1);
                  }}
                  className="solid-warning-btn"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

SingleProduct.propTypes = {
  wishList: PropTypes.array,
  handleLikeBtnClick: PropTypes.func,
  products: PropTypes.array,
};

export default SingleProduct;

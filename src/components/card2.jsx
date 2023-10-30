import PropTypes from "prop-types";

import "./card2.css";
import { useState } from "react";
const Card2 = ({
  bookName,
  originalPrice,
  author,
  discountedPrice,
  imgSrc,
  imgAlt,
  badgeText,
  discountPercent,
  _id,
  genre,
  setBookNumber,
  bookNumber,
  setRemoveItemFromCart,
  handleLikeBtnClick,
  setCountCard,
}) => {
  const [dis, setDis] = useState(false);
  const [bookNumber1, setBookNumber1] = useState(0);
  return (
    <div className="card-basic-horizontal">
      <img className="cart-item-book-img" src={imgSrc} alt={imgAlt} />
      <div id="cart-item-detail" className="card-item-details">
        <h4 id="item-title">{bookName}</h4>
        <p className="item-author">- By &nbsp;{author}</p>
        <p className="price-details">
          $; {discountedPrice} &nbsp;&nbsp;
          <del>$; {originalPrice}</del> &nbsp;&nbsp;
          <span className="discount-on-card">{discountPercent}% off</span>
        </p>

        <div
          className="item-cart-quantity"
          style={{ display: "flex", alignItems: "center" }}
        >
          <p className="cart-quantity-para">Quantity : &nbsp;&nbsp;</p>
          <div className="quantity-manage-container">
            <div
              className="quantity-change"
              // onClick={setBookNumber1((bookNumber1) => bookNumber1 - 1)}
            >
              -
            </div>
            <input
              style={{ textAlign: "center" }}
              className="cart-item-quantity-input"
              value={bookNumber1}
              onInput={(event) => {
                setBookNumber({
                  ...bookNumber,
                  [_id]: Number(event.target.value),
                });
                console.log(bookNumber, "obj");
                setBookNumber1(Number(event.target.value));
              }}
              type="text"
              maxLength="3"
              autoComplete="off"
            />
            <div
              className="quantity-change"
              // onClick={setBookNumber1((bookNumber1) => bookNumber1 + 1)}
            >
              +
            </div>
          </div>
        </div>

        <div className="cart-horizontal-card-btns card-button">
          <button
            disabled={dis}
            className="solid-primary-btn"
            onClick={() => {
              setDis(true);
              setCountCard((prev) => prev - 1);
              setRemoveItemFromCart(_id);
            }}
          >
            Remove from Cart
          </button>
          <br />
          <button
            className="outline-primary-btn"
            onClick={() => handleLikeBtnClick(_id)}
          >
            Add to Wishlist
          </button>
        </div>
        {/* <div className="badge-on-card">{badgeText}</div> */}
      </div>
    </div>
  );
};

export default Card2;

Card2.propTypes = {
  bookName: PropTypes.string,
  originalPrice: PropTypes.number,
  author: PropTypes.string,
  discountedPrice: PropTypes.number,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  badgeText: PropTypes.string,
  discountPercent: PropTypes.number,
  _id: PropTypes.string,
  genre: PropTypes.string,
};

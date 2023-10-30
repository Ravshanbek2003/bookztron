// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CardBill from "@/components/card-bill";
import Card2 from "@/components/card2";
function CardShop({local, cardId, products, handleLikeBtnClick, setCountCard }) {
  const [bookNumber, setBookNumber] = useState({});
  const [removeItemFromCart, setRemoveItemFromCart] = useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("card-data")) || [];
    const idx = products.findIndex((el) => el._id === cardId);
    localStorage.clear("card-data");
    if (
      idx !== -1 &&
      cartData[cartData.length - 1]?.bookName !== products[idx]?.bookName
    ) {
      cartData.push(products[idx]);
    }
    localStorage.setItem("card-data", JSON.stringify(cartData));
  }, [cardId, local]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("card-data"));
    const cartData1 = cartData?.filter((el) => el._id !== removeItemFromCart);
    localStorage.setItem("card-data", JSON.stringify(cartData1));
    console.log(JSON.parse(localStorage.getItem("card-data")));
  }, [removeItemFromCart]);
  return (
    <>
      <h1 className=" text-center font-sans font-bold">
        {JSON.parse(localStorage.getItem("card-data")).length} &nbsp; items in
        Card
      </h1>
      <div style={{ display: "flex", gap: "200px" }}>
        {/* {JSON.parse(localStorage.getItem("card-data"))?.length ? ( */}
        <>
          <div>
            {JSON.parse(localStorage.getItem("card-data"))?.map((el, idx) => {
              return (
                <Card2
                  setCountCard={setCountCard}
                  handleLikeBtnClick={handleLikeBtnClick}
                  {...el}
                  setBookNumber={setBookNumber}
                  bookNumber={bookNumber}
                  setRemoveItemFromCart={setRemoveItemFromCart}
                  // setProductQuantity={setProductQuantity}
                  // productQuantity={productQuantity}
                  key={idx}
                />
              );
            })}
          </div>
          <div>
            <CardBill
              bookNumber={bookNumber}
              children={JSON.parse(localStorage.getItem("card-data"))}
            />
          </div>
        </>
        {/* // ) : ( // <h1>no card</h1>
      // )} */}
      </div>
    </>
  );
}
export default CardShop;

CardShop.propTypes = {
  cardId: PropTypes.string,
  products: PropTypes.array,
};

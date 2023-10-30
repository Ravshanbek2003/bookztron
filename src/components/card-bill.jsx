import { useState } from "react";
import "./card-bill.css";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
const CardBill = ({ children, bookNumber }) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  let discount = 0,
    total = 0;
  return (
    <div className="cart-bill">
      <h2 className="bill-heading">Bill Details</h2>

      <hr></hr>
      {children?.map((product) => {
        discount +=
          (product.originalPrice - product.discountedPrice) *
          bookNumber[product._id];

        total += product.discountedPrice * bookNumber[product._id];
        return (
          <div key={product._id} className="cart-price-container">
            <div className="cart-item-bookname">
              <p>{product.bookName}</p>
            </div>
            <div className="cart-item-quantity">
              <p>X {bookNumber[product._id]}</p>
            </div>
            <div className="cart-item-total-price" id="price-sum">
              <p>
                $;
                {product.discountedPrice * bookNumber[product._id]
                  ? product.discountedPrice * bookNumber[product._id]
                  : 0}
              </p>
            </div>
          </div>
        );
      })}

      <hr></hr>

      <div className="cart-discount-container">
        <div className="cart-item-total-discount">
          <p>Discount</p>
        </div>
        <div className="cart-item-total-discount-amount" id="price-sum">
          <p>$ {discount ? discount : 0}</p>
        </div>
      </div>

      <div className="cart-delivery-charges-container">
        <div className="cart-item-total-delivery-charges">
          <p>Delivery Charges</p>
        </div>
        <div className="cart-item-total-delivery-charges-amount" id="price-sum">
          <p id="delivery-charges">$ 50</p>
        </div>
      </div>

      <hr></hr>

      <div className="cart-total-charges-container">
        <div className="cart-item-total-delivery-charges">
          <p>
            <b>Total Charges</b>
          </p>
        </div>
        <div className="cart-item-total-delivery-charges-amount" id="price-sum">
          <p id="total-charges">
            <b>$ {total ? total : 0}</b>
          </p>
        </div>
      </div>

      <hr></hr>

      <div className="apply-coupon-container">
        <p>Apply Coupon</p>
        <input
          value={"TRY BOOKS 200"}
          //   onChange={(event) => setCouponName(event.target.value)}
          placeholder="Try BOOKS200"
        ></input>
      </div>

      <button
        className="place-order-btn solid-secondary-btn"
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Place Order
      </button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>
            <div className=" flex items-center">
              {" "}
              <img src="../../public/favicon-icon.png" alt="img" /> &nbsp;&nbsp;
              Bookztron
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img
              src="https://e-asveta.adu.by/images/content/images/material/QR-cod1.png"
              alt=""
            />
            <Text>total products {children?.length || 0}</Text>
            <br />
            <br />
            <Text>discount &nbsp; {discount || 0}</Text>
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Pay now</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CardBill;

function BackdropExample() {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  return (
    <>
      <Button
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Use Overlay one
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Custom backdrop filters!</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

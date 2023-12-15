import CardIcon from "../../images/credit-card.svg";
import ProductImage from "../../images/product-image.jpg";

import PayPalButton from "../../Components/PayPalButton";
import "../Checkout/styles.css";
import { Container } from "@mui/material";
import { Padding } from "@mui/icons-material";

const Checkout = () => {
  const product = {
    description: "Job Posting",
    price: 110,
  };
  return (
    <Container>
      <div className="checkout" style={{paddingTop:"100px"}}>
        <h1>PayPal Checkout</h1>
        <p className="checkout-title">Job Posting</p>
        <p className="checkout-description">
          Your Payment will be on hold with us until the job gets completed.
        </p>
        <h1 className="checkout-price">$19</h1>
        <img
          className="checkout-product-image"
          src={"https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt="Product"
        />
        <button className="checkout-button">
          <div className="grey-circle">
            <div className="purple-circle">
              <img className="icon" src={CardIcon} alt="credit-card-icon" />
            </div>
          </div>
          <div className="text-container">
            <p className="text">Buy</p>
          </div>
        </button>
        <div className="separator"></div>
        <div className="paypal">
          <p className="checkout-title">OR, PAY WITH PAYPAL</p>
          <div classname="paypal-button-container">
            <PayPalButton product={product} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;

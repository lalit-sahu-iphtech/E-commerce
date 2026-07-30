import {
    FaShippingFast,
    FaHeadphones,
    FaShieldAlt,
  } from "react-icons/fa";
  
  import "./featured.css";
  
  export default function Services() {
    return (
      <section className="services">
  
        <div className="service-card">
  
          <div className="service-icon">
            <FaShippingFast />
          </div>
  
          <h3>FREE AND FAST DELIVERY</h3>
  
          <p>Free delivery for all orders over $140</p>
  
        </div>
  
        <div className="service-card">
  
          <div className="service-icon">
            <FaHeadphones />
          </div>
  
          <h3>24/7 CUSTOMER SERVICE</h3>
  
          <p>Friendly 24/7 customer support</p>
  
        </div>
  
        <div className="service-card">
  
          <div className="service-icon">
            <FaShieldAlt />
          </div>
  
          <h3>MONEY BACK GUARANTEE</h3>
  
          <p>We return money within 30 days</p>
  
        </div>
  
      </section>
    );
  }
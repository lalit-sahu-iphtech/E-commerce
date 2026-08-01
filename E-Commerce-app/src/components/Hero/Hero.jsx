import heroImg from "../../assets/hero/heroImg.png"
import { FaApple } from "react-icons/fa";
import "./hero.css"
export default function Hero(){
  const handleShopNow = () =>{
    const section = document.getElementById("flash-sale");

    if(section){
      section.scrollIntoView({
        behavior : "smooth",
      });
    }
  };

    return(
  
             <div className="hero">
            <img src={heroImg} alt="iphone" />

            <div className="hero-content">
              <p className="series"><span>
                 <FaApple className="apple-icon" />
                </span>iPhone 14 Series</p>
              <h1>Up to 10%
                <br />  
                off Voucher
              </h1>
              <button className="shop-btn"
              onClick={handleShopNow}
              >Shop Now</button> <span className="arrow">→</span>
            </div>
          </div>
     
    )
}
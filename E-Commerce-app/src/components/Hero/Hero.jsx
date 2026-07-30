import heroImg from "../../assets/hero/heroImg.png"
import "./hero.css"
export default function Hero(){

    return(
  
             <div className="hero">
            <img src={heroImg} alt="iphone" />

            <div className="hero-content">
              <p className="series"><span></span>iPhone 14 Series</p>
              <h1>Up to 10%
                <br />  
                off Voucher
              </h1>
              <button className="shop-btn">Shop Now</button> <span>→</span>
            </div>
          </div>
     
    )
}
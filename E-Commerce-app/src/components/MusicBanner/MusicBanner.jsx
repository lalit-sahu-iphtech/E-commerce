
import { useNavigate } from "react-router-dom"
import speaker from "../../assets/speaker/speaker.png"
import "./MusicBanner.css"
import { useState, useEffect } from "react"
export default function MusicBanner(){
    const navigate = useNavigate();
    const[timeLeft, setTimeLeft] = useState({
        days : 0,
        hours : 0,
        minutes : 0,
        seconds : 0,
    })
    const targetDate = new Date("2026-08-15T23:59:59");

    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date();
        const difference = targetDate - now;
    
        if (difference <= 0) {
          clearInterval(timer);
          return;
        }
    
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
    
        setTimeLeft({ days, hours, minutes, seconds });
      }, 1000);
    
      return () => clearInterval(timer);
    }, []);
    return(
       <section className="music-banner">
        <div className="banner-content">
            <span className="category">Categories</span>

            <h2>Enhance Your Music Experience</h2>

            <div className="countdown">

                <div className="time-box">
                    <h3>{String(timeLeft.days).padStart(2, "0")}</h3>
                    <p>Days</p>
                </div>

                <div className="time-box">
                    <h3>{String(timeLeft.hours).padStart(2, "0")}</h3>
                    <p>Hours</p>
                </div>

                <div className="time-box">
                    <h3>{String(timeLeft.minutes).padStart(2, "0")}</h3>
                    <p>Minutes</p>
                </div>

                <div className="time-box">
                    <h3>{String(timeLeft.seconds).padStart(2, "0")}</h3>
                    <p>Seconds</p>
                </div>

                </div>

            <button onClick={() => navigate("/products")}>Buy Now!</button>
        </div>

        <div className="banner-image">
            <img src={speaker}/>
        </div>
       </section>
    )
}
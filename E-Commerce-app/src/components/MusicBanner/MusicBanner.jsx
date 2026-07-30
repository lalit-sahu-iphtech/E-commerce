
import speaker from "../../assets/speaker/speaker.png"
import "./MusicBanner.css"
export default function MusicBanner(){
    return(
       <section className="music-banner">
        <div className="banner-content">
            <span className="category">Categories</span>

            <h2>Enhance Your Music Experience</h2>

            <div className="countdown">
                <div className="time-box">
                    <h3>23</h3>
                    <p>Hours</p>
                </div>
                <div className="time-box">
                    <h3>05</h3>
                    <p>Days</p>
                </div>
                <div className="time-box">
                    <h3>59</h3>
                    <p>Minutes</p>
                </div>
                <div className="time-box">
                    <h3>35</h3>
                    <p>Seconds</p>
                </div>
            </div>
            <button>Buy Now!</button>
        </div>

        <div className="banner-image">
            <img src={speaker}/>
        </div>
       </section>
    )
}
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./home.css"
import Hero from "../Hero/Hero";
import FlashSale from "../product/FlashSale";
import Category from "../category/Category";
import SellingFlash from "../sellingProducts/SellingFlash";
import MusicBanner from "../MusicBanner/MusicBanner"
import ExploreProducts from "../ExploreProducts/ExploreProducts";
import Featured from "../Featured/Featured";
import Footer from "../Footer/Footer";
export default function Home(){
    return(
        <>
        {/* <Navbar/> */}
        <div className="home">
            <Sidebar/>
            <Hero/>
            
        </div>
        <FlashSale/>

        <Category/>
        <SellingFlash/>

        <MusicBanner/>
        <ExploreProducts/>
        <Featured/>
        <Footer/>
        </>
    )
}
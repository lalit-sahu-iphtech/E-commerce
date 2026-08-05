import Sidebar from "../Sidebar/Sidebar";
import Hero from "../Hero/Hero";
import FlashSale from "../product/FlashSale";
import Category from "../category/Category";
import SellingFlash from "../sellingProducts/SellingFlash";
import MusicBanner from "../MusicBanner/MusicBanner";
import ExploreProducts from "../ExploreProducts/ExploreProducts";
import Featured from "../Featured/Featured";
import "./home.css";

export default function Home() {
  return (
    <>
      <div className="home">
        <Sidebar />
        <Hero />
      </div>

      <FlashSale />
      <Category />
      <SellingFlash />
      <MusicBanner />
      <ExploreProducts />
      <Featured />
    </>
  );
}
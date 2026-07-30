import "./featured.css";

import FeaturedCard from "./FeaturedCard";
import Services from "./Services";
import ScrollTop from "./ScrollTop";

import ps5 from "../../assets/featured/ps5.png";
import women from "../../assets/featured/women.png";
import speaker from "../../assets/featured/speakers.png";
import perfume from "../../assets/featured/perfume.png";

export default function Featured() {

  return (

    <section className="featured-section">

      {/* Heading */}

      <div className="today">
        <span className="today-bar"></span>
        <span className="today-text">
          Featured
        </span>
      </div>

      <h2 className="featured-title">
        New Arrival
      </h2>

      {/* Grid */}

      <div className="featured-grid">

        {/* Left */}

        <FeaturedCard
          image={ps5}
          title="PlayStation 5"
          description="Black and White version of the PS5 coming out on sale."
          large
        />

        {/* Right */}

        <div className="right-grid">

          <FeaturedCard
            image={women}
            title="Women's Collections"
            description="Featured woman collections that give you another vibe."
            wide
          />

          <div className="bottom-grid">

            <FeaturedCard
              image={speaker}
              title="Speakers"
              description="Amazon wireless speakers"
            />

            <FeaturedCard
              image={perfume}
              title="Perfume"
              description="GUCCI INTENSE OUD EDP"
            />

          </div>

        </div>

      </div>
      <Services />
     <ScrollTop />

    </section>

  );
}
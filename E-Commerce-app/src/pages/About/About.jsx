import "./about.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

import aboutImg from "../../assets/about/about.png";

import storeIcon from "../../assets/about/store.png";
import saleIcon from "../../assets/about/sale.png";
import bagIcon from "../../assets/about/bag.png";
import moneyIcon from "../../assets/about/money.png";

export default function About() {
  const stats = [
    {
      id: 1,
      icon: storeIcon,
      number: "10.5k",
      text: "Sellers active on our site",
    },
    {
      id: 2,
      icon: saleIcon,
      number: "33k",
      text: "Monthly Product Sale",
     
    },
    {
      id: 3,
      icon: bagIcon,
      number: "45.5k",
      text: "Customer active on our site",
    },
    {
      id: 4,
      icon: moneyIcon,
      number: "25k",
      text: "Annual gross sale on our site",
    },
  ];

  return (
    <>
      <section className="about-page">
        {/* Breadcrumb */}

        <div className="about-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <p>About</p>
        </div>

        {/* Story Section */}

        <div className="about-hero">
          <div className="about-left">
            <h1>Our Story</h1>

            <p>
              Launched in 2015, Exclusive is South Asia’s premier online
              shopping marketplace with an active presence in Bangladesh.
              Supported by a wide range of tailored marketing, data and service
              solutions, Exclusive has 10,500 sellers and over 300 brands and
              serves 3 million customers across the region.
            </p>

            <p>
              Exclusive has more than 1 Million products to offer, growing at a
              very fast pace. Exclusive offers a diverse assortment in
              categories ranging from consumer electronics, fashion, home
              essentials, groceries, lifestyle products, sports equipment and
              much more.
            </p>
          </div>

          <div className="about-right">
            <img src={aboutImg} alt="About" />
          </div>
        </div>

        {/* Statistics */}

        <div className="stats-section">
          {stats.map((item) => (
            <div
              key={item.id}
              className="stat-card"
            >
              <div className="icon-circle">
                <img src={item.icon} alt="" />
              </div>

              <h2>{item.number}</h2>

              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
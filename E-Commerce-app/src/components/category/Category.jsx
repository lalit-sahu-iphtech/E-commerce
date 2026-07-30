import phone from "../../assets/category/phone.png"
import computers from "../../assets/category/computers.png"
import smartwatch from "../../assets/category/smartwatch.png"
import camera from "../../assets/category/camera.png"
import headphone from "../../assets/category/headphone.png"
import gaming from "../../assets/category/gaming.png"

import "./category.css"

const categories = [
    { name : "Phones", icon: phone },
    {name : "Computers",icon: computers},
    {name : "SmartWatch",icon: smartwatch},
    { name : "Camera",icon:camera, active: true },
    {name : "HeadPhones",icon: headphone},
    { name : "Gaming", icon: gaming },
]
export default function Category(){

    return(
        <section className="category-section">

            <div className="category-header">
                <div className="today">
                    <span className="today-bar"></span>
                    <span className="today-text">Categories</span>
                </div>

                <div className="category-top">
                    <h2 className="category-title">Browse By Category</h2>

                    <div className="arrows">
                        <button className="arrow-btn">&#8592;</button>
                        <button className="arrow-btn">&#8594;</button>
                    </div>
                </div>
            </div>

            <div className="categories">
                {categories.map((item, index) => (
                    <div
                        key={index}
                        className={`category-card ${item.active ? "active" : ""}`}
                    >
                        <img src={item.icon} alt={item.name} />
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>

        </section>
    )
}
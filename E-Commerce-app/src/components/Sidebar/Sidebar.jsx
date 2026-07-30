import "./sidebar.css";
import { FaChevronRight } from "react-icons/fa";
export default function Sidebar(){

    return(
       <aside className="sidebar">
         <ul>
            <li>Woman's Fashion
                <FaChevronRight className="arrow"/>
            </li>
            <li>Men's Fashion
            <FaChevronRight className="arrow"/>

            </li>
            
            <li>Electronics</li>
            <li>Home & Lifestyle</li>
            <li>Medicine</li>
            <li>Sports & Outdoor</li>
            <li>Baby's & Toys</li>
            <li>Groceries & pets</li>
            <li>Health & Beauty</li>
        </ul>
       </aside>
    )
}
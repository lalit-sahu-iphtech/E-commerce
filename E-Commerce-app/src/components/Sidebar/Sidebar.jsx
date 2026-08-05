import "./sidebar.css";
import { FaChevronRight } from "react-icons/fa";
import { useCategory } from "../../context/CategoryContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Sidebar() {

  const navigate = useNavigate();

    const {
        category,
        setCategory,
        subCategory,
        setSubCategory,
      } = useCategory();

  const [hoverMenu, setHoverMenu] = useState("");

  const categories = [
    {
      title: "Woman's Fashion",
      submenu: [
        "Dresses",
        "Handbags",
        "High Heels",
        "Jewellery",
        "Makeup",
      ],
    },

    {
      title: "Men's Fashion",
      submenu: [
        "Shirts",
        "Shoes",
        "Watches",
        "Bags",
        "Jackets",
      ],
    },

    {
      title: "Electronics",
    },

    {
      title: "Home & Lifestyle",
    },

    {
      title: "Medicine",
    },

    {
      title: "Sports & Outdoor",
    },

    {
      title: "Baby's & Toys",
    },

    {
      title: "Groceries & Pets",
    },

    {
      title: "Health & Beauty",
    },
  ];

  return (
    <aside className="sidebar">

      <ul>

        {categories.map((item) => (

          <li

            key={item.title}

            className={`sidebar-item ${
              category === item.title
                ? "active-category"
                : ""
            }`}

           onClick={() => {
            setCategory(item.title);
            navigate(`/sidebar/${item.title}`);
        }}

            onMouseEnter={() =>
              setHoverMenu(item.title)
            }

            onMouseLeave={() =>
              setHoverMenu("")
            }

          >

            <span>{item.title}</span>

            {item.submenu && (
              <FaChevronRight
                className="arrow"
                size={14}
                color="#000"
              />
            )}

            {hoverMenu === item.title &&
              item.submenu && (

                <div className="submenu">

                  {item.submenu.map((sub) => (

                        <div
                        key={sub}
                        className={`submenu-item ${
                        subCategory === sub ? "active-submenu" : ""
                        }`}
                       onClick={(e) => {
                        e.stopPropagation();

                        setCategory(item.title);
                        setSubCategory(sub);

                        navigate(`/sidebar/${sub}`);
                    }}
                        >
                        {sub}
                        </div>

                  ))}

                </div>

              )}

          </li>

        ))}

      </ul>

    </aside>
  );
}
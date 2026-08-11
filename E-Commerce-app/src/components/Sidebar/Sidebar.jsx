import "./sidebar.css";
import { FaChevronRight,  FaTimes } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";
import { useCategory } from "../../context/CategoryContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";


export default function Sidebar() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

const searchValue = searchParams.get("search") || "";

    const {
        category,
        setCategory,
        subCategory,
        setSubCategory,
      } = useCategory();

  const [hoverMenu, setHoverMenu] = useState("");

  const[sidebarOpen, setSidebarOpen] = useState(false);

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
    <>
    {/* Mobile Sidebar Button */}

    <button
      className="mobile-sidebar-toggle"
      onClick={() => setSidebarOpen(!sidebarOpen)}
      aria-label={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
    >
      {sidebarOpen ? <FaTimes /> : <FiSidebar />}

      <span className="sidebar-tooltip">
        {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </span>
    </button>

    <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
      <button 
      className="mobile-close-btn"
      onClick={()=>setSidebarOpen(false)}
      
      >
        <FaTimes/>
      </button>

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
            setSidebarOpen(false);
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
                        setSidebarOpen(false);
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
    {sidebarOpen && (
      <div className="sidebar-overlay"onClick={()=>setSidebarOpen(false)}>

      </div>
    )}
    </>

  );
}
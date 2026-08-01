import "./profile.css";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Profile() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  useEffect(() => {
    if (!currentUser) {
      navigate("/signup");
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    // Remove logged in user
    localStorage.removeItem("currentUser");

    alert("Logged out successfully");

    // Redirect to Home
    navigate("/");

    // Refresh Navbar
    window.location.reload();
  };

  if (!currentUser) return null;

  return (
    <section className="profile-page">
      <div className="profile-card">
        <FaRegUserCircle className="profile-icon" />

        <h2>My Profile</h2>

        <div className="profile-info">
          <label>Name</label>
          <input
            type="text"
            value={currentUser.name}
            readOnly
          />
        </div>

        <div className="profile-info">
          <label>Email</label>
          <input
            type="email"
            value={currentUser.email}
            readOnly
          />
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </section>
  );
}
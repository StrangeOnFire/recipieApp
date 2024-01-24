import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./css-fragments/navbar.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import '../App.css'
export default function Navbar() {
  const [showNavbar, setShowNavbar] = React.useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const logout = ()=>{
    setCookies("access_token","");
    window.localStorage.removeItem("userID");
    navigate("/auth")
  }
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">Recipedia</div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <Hamburger />
          </div>
          <div className={`nav-elements  ${showNavbar && "active"}`}>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/create-recipie">Create Recipie</NavLink>
              </li>
              <li>
                <NavLink to="/saved-recipie">Saved Recipie</NavLink>
              </li>
              <li>
                {!cookies.access_token && (window.localStorage.userID == undefined ? true : false)? (
                  <NavLink to="/auth">Login / Register</NavLink>
                ) : (
                  <button onClick={logout}>Logout</button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
 
    </>
  );
}

const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#574c4c"
      />
    </g>
  </svg>
);

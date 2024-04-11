import { useState } from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
function Navbar() {
  const [bgNavbar, setBgNavbar] = useState(false);

  function scrollingHandler() {
    window.scrollY < 100 ? setBgNavbar(false) : setBgNavbar(true);
  }
  window.addEventListener("scroll", scrollingHandler);

  const classesNavBar = `${classes["bg-navbar"]} ${
    bgNavbar && classes["bg-black"]
  }`;

  return (
    <div className={classesNavBar}>
      <div className={classes.container}>
        <div className={classes.navbar}>
          {/* logo */}
          <Link to={"/"} className={classes.logo}>
            Movie App
          </Link>
          {/* {icon search} */}
          <Link to="/Search">
            <button className={classes.btnSearch}>
              <i
                className={`fa-solid fa-magnifying-glass ${classes["icon-search"]}`}
              ></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Navbar;

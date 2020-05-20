import React from "react";
import { Link } from "react-router-dom";

const navStyle = {
  backgroundColor: "#72bb53",
  marginBottom: "20px",
};

const Navbar = () => {
  const guestLinks = (
    <ul class='navbar-nav'>
      <li>
        <Link class='nav-link' to='/register'>
          Register
        </Link>
      </li>
      <li>
        <Link class='nav-link' to='/login'>
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav
      class='navbar navbar-expand-lg navbar-dark bg-#72bb53'
      style={navStyle}
    >
      <Link class='navbar-brand' to='/'>
        GoLoGoLo Home
      </Link>

      <button
        class='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span class='navbar-toggler-icon'></span>
      </button>
      <div class='collapse navbar-collapse' id='navbarNav'>
        {guestLinks}
      </div>
    </nav>
  );
};

export default Navbar;

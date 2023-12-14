import React from "react";

import logo from "../assets/logo.png";

function Header() {
  // const [theme, setTheme] = useState("medium");
  // document.documentElement.classList.add(theme);
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="V Task" />
        <span>V Task</span>
      </div>
      {/* <span className="themeSelector">
        <span className={"light"}></span>
        <span className={"medium"}></span>
        <span className={"dark"}></span>
        <span className={"gradientOne activeTheme"}></span>
        <span className={"gradientTwo"}></span>
        <span className={"gradientThree"}></span>
      </span> */}
    </header>
  );
}

export default Header;

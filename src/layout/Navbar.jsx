import React from "react";
import HomeIcon from "../components/utils/Icons/HomeIcon";

export default function Navbar() {
  return (
    <nav className="navbar">
      <li>
        <HomeIcon path="home" />
      </li>
      <li>
        <HomeIcon path="hat" />
      </li>
      <li>
        <HomeIcon path="group" />
      </li>
      <li>
        <HomeIcon path="doc" />
      </li>
      <li>
        <HomeIcon path="tick" />
      </li>
      <li>
        <HomeIcon path="wifi" />
      </li>
      <li>
        <HomeIcon path="contact" />
      </li>
      <li>
        <HomeIcon path="settings" />
      </li>
    </nav>
  );
}

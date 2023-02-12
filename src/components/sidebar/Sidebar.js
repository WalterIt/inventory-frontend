import { AiOutlineStock } from "react-icons/ai";
import React, { useState } from "react";
import "./Sidebar.scss";
import { HiMenuAlt3 } from "react-icons/hi";
import menu from "../../data/sidebar";
import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  function toggle() {
    return setIsOpen(!isOpen);
  }
  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <Link to="/">
              <AiOutlineStock size={35} style={{ cursor: "pointer" }} />
            </Link>
          </div>
          <div
            className="bars"
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
          >
            <HiMenuAlt3 size={25} onClick={toggle} />
          </div>
        </div>

        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>
      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
}

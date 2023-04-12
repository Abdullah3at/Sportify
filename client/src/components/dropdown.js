import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { HiOutlineMenu } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import Loginbutton from "./LoginButton";
import Logoutbutton from "./LogoutButton";
import Profile from "./Profile";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowOverlay(!showOverlay);
  };
  console.log();
  // const handleBlur = () => {
  //   setIsOpen(false);
  //   setShowOverlay(false);
  // };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setShowOverlay(false);
  };

  const items = [
    { id: 1, label: "Indoor", url: "/indoor" },
    { id: 2, label: "Outdoor", url: "/outdoor" },
    { id: 3, label: "Reservations", url: "/Reservations" },
    // { id: 4, label: "Contact", url: "/" },
  ];

  return (
    <div>
      <Overlay show={showOverlay} />
      <DropdownContainer>
        <DropdownToggle onClick={handleToggle}>
          <Profile />
          <DropIcon />
        </DropdownToggle>
        <DropdownMenu isOpen={isOpen} onMouseLeave={handleMouseLeave}>
          {items.map((item, i) => (
            <Nav
              to={`../${item.url}`}
              key={i}
              onClick={() => {
                setIsOpen(false);
                setShowOverlay(false);
              }}
            >
              <DropdownMenuItem>
                <Item>{item.label}</Item>
              </DropdownMenuItem>
            </Nav>
          ))}
          <Logoutbutton />
          <Loginbutton />
        </DropdownMenu>
      </DropdownContainer>
    </div>
  );
};

const Item = styled.p``;
const Nav = styled(NavLink)`
  text-decoration: none;
`;

const DropIcon = styled(HiOutlineMenu)`
  font-size: 50px;
  margin: 20px;
  margin-right: 50px;
`;

const DropdownContainer = styled.div`
  position: relative;
  text-align: right;
  display: flex;
  justify-content: flex-end;
`;

const DropdownToggle = styled.button`
  background-color: transparent;
  display: flex;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const DropdownMenu = styled.ul`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(0, -50%);
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  list-style: none;
  padding: 500px;
  box-shadow: 0 2px 1000px rgba(0, 0, 0, 0.5);
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: visibility 0s, opacity 0.2s linear;
`;

const DropdownMenuItem = styled.li`
  margin: 50px 0;
  color: white;
  font-size: 25px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
    text-decoration-color: green;
    text-underline-offset: 10px;
    transition: all 0.3s ease-in-out;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.show ? "block" : "none")};
  z-index: 999;
`;

export default Dropdown;

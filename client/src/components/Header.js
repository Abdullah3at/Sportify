import styled from "styled-components";
import backgroungImage from "./images/background.png";
import logo from "./images/logo.png";
import Dropdown from "./dropdown";
import Profile from "./Profile";
import VideoBG from "./video/videoHeader.mp4";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <HeaderContainer>
      <Video src={VideoBG} autoPlay loop muted />
      <Dropdown />
      <Nav to="/">
        <Img src={logo} />
      </Nav>
      <P>Book a Field</P>
      <P>Start the Game</P>
    </HeaderContainer>
  );
};

const Nav = styled(NavLink)`
  cursor: pointer;
`;

const Video = styled.video`
  height: 50%;
  width: 100%;
  position: absolute;
  object-fit: cover;
`;

const P = styled.p`
  margin-left: 50px;
  margin-top: -50px;
  font-weight: bold;
  font-size: 40px;
  font-family: "Trebuchet MS";
  position: relative;
`;

const Img = styled.img`
  height: 300px;
  width: 300px;
  margin-top: -150px;
  margin-bottom: 30px;
  position: relative;
`;

const HeaderContainer = styled.header`
  color: #fff;
  font-size: 24px;
`;

export default Header;

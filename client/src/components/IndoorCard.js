import styled from "styled-components";
import indoorImg from "./images/indoorImg.png";
import { NavLink } from "react-router-dom";

const indoorCard = () => {
  return (
    <IndoorContainer>
      <TextContainer>
        <P>InDoor</P>
        <Div>
          <Span>
            Welcome to our indoor football fields! Whether you're a seasoned
            player or just starting out, our fields offers a safe and
            comfortable space to play and train year-round. With high-quality
            turf and top-of-the-line equipment, you'll feel like you're playing
            on a professional fields.
          </Span>{" "}
          Our indoor football fields are perfect for small-sided games, pickup
          matches, and even league play. We offer flexible scheduling options so
          you can find a time that works for you and your team. Plus, our
          facility has everything you need for a great game, including locker
          rooms, showers, and plenty of parking.
        </Div>
        <Nav to="/indoor">
          <Button>Book Now!</Button>
        </Nav>
      </TextContainer>
      <Img src={indoorImg} />
    </IndoorContainer>
  );
};

const Button = styled.button`
  background-color: white;
  color: darkgreen;
  padding: 10px 150px;
  margin-left: 200px;
  border: 1px solid darkgreen;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Trebuchet MS";
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkgreen;
    color: white;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 5 5px #666;
  }
`;
const Nav = styled(NavLink)``;
const Img = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
const IndoorContainer = styled.div`
  display: flex;
  margin: 50px;
  background-color: white;
  border-radius: 8px;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 40px 80px 0 rgba(0, 0, 0, 0.2);
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const Div = styled.div`
  padding: 100px;
  font-weight: bold;
  font-family: "Trebuchet MS";
`;
const P = styled.p`
  font-size: 40px;
  margin: 30px;
  font-weight: bold;
  font-family: "Trebuchet MS";
`;

const Span = styled.p`
  font-size: 16px;
`;

export default indoorCard;

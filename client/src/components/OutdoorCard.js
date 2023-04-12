import styled from "styled-components";
import outdoorImg from "./images/outdoorImg.png";
import { NavLink } from "react-router-dom";

const outdoorCard = () => {
  return (
    <OutdoorContainer>
      <Img src={outdoorImg} />
      <TextContainer>
        <P>Outdoor</P>
        <Div>
          <Span>
            Get ready to play football like never before on our world-class
            outdoor fields! Our fields provides a safe and comfortable space to
            practice and play in the great outdoors. With lush green grass and
            top-of-the-line equipment, you'll feel like a professional athlete.
          </Span>{" "}
          Our outdoor football fields are perfect for players of all levels,
          from beginners to seasoned pros. We offer flexible scheduling options
          so you can easily find a time to play with your team or friends. Plus,
          our facility features convenient amenities like locker rooms, showers,
          and ample parking to make your visit a breeze.
        </Div>
        <Nav to="/outdoor">
          <Button>Book Now!</Button>
        </Nav>
      </TextContainer>
    </OutdoorContainer>
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
const OutdoorContainer = styled.div`
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

export default outdoorCard;

import styled from "styled-components";
import indoorImg from "./images/indoorImg.png";
import { useState, useEffect } from "react";
import { BiFootball } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Outdoor = () => {
  const [isLoading, setisLoading] = useState(true);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    fetch("/outdoor")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFields(data);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <LoaderIconPosition>
        <LoaderIcon />
      </LoaderIconPosition>
    );
  }

  return (
    <OutdoorContainer>
      <P>OutDoor</P>
      <TextContainer>
        {fields.map((field, i) => (
          <Nav to={`./${field._id}`} key={i}>
            <SubContainer>
              <Img src={field.imageSrc} />
              <Name>{field.name}</Name>
              <Price>{field.price} / 2Hr</Price>
            </SubContainer>
          </Nav>
        ))}
      </TextContainer>
      {/* <Img src={indoorImg} /> */}
    </OutdoorContainer>
  );
};

const Price = styled.div`
  margin: 15px;
`;

const Nav = styled(NavLink)`
  text-decoration: none;
  color: black;
  margin: 10px;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 100px 200px rgba(0, 0, 0, 0.4);
  }
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 15px;
`;

const Img = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;
const OutdoorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px;
  margin-top: 100px;
  background-color: white;
  border-radius: 8px;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 40px 80px 0 rgba(0, 0, 0, 0.2);
  }
`;

const TextContainer = styled.div`
  display: flex;
  margin: 50px;
`;

const Div = styled.div`
  padding: 100px;
`;

const P = styled.p`
  font-size: 40px;
  margin: 30px;
`;

const Span = styled.p`
  font-size: 16px;
`;

const LoaderIconPosition = styled.div`
  min-height: 80vh;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const LoaderIcon = styled(BiFootball)`
  animation: spin 2s linear infinite;
  font-size: 4rem;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Outdoor;

import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { NavLink, Navigate, useParams } from "react-router-dom";
import { BiFootball } from "react-icons/bi";
import Book from "./Book";
import { useAuth0 } from "@auth0/auth0-react";

const FieldDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState();
  const [isBooked, setIsBooked] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const { id } = useParams();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    fetch(`./${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        console.log(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (isLoading) {
    return (
      <p>
        <LoaderIconPosition>
          <LoaderIcon />
        </LoaderIconPosition>
      </p>
    );
  }

  const handleBookClick = () => {
    setIsBooked(true);
    setIsRemoved(true);
  };
  const handleBookRemove = () => {
    setIsBooked(false);
    setIsRemoved(false);
  };
  const days = details.schedule;

  return (
    <Center>
      <Container>
        <Img src={details.imageSrc} />
        <Textcontainer>
          <FieldName>Field Name : {details.name}</FieldName>
          <Capacity>Capacity : {details.capacity}</Capacity>
          <Price>Price : {details.price} / 2Hr</Price>
        </Textcontainer>
      </Container>
      {isAuthenticated ? (
        <BookButton onClick={handleBookClick}>Book</BookButton>
      ) : (
        <BookButton
          style={{
            backgroundColor: "grey",
            cursor: "not-allowed",
          }}
        >
          Log in to Book
        </BookButton>
      )}
      {isBooked && <Book />}
      {isRemoved && <Remove onClick={handleBookRemove}>x</Remove>}
    </Center>
  );
};

const Remove = styled.button`
  background-color: transparent;
  border: none;
  color: gray;
  cursor: pointer;
  font-size: 1.2rem;
  font-size: 30px;
  margin-top: 20px;
  transition: color 0.2s;

  &:hover {
    color: darkgreen;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;
const BookButton = styled.button`
  background-color: white;
  color: darkgreen;
  padding: 10px 150px;
  margin: 40px;
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

const Textcontainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 100px;
  margin-top: 20px;
  color: #333;
  font-size: 26px;
`;

const FieldName = styled.p`
  margin-bottom: 5px;
`;

const Capacity = styled.p`
  margin-bottom: 5px;
`;

const Price = styled.p`
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  padding: 80px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Img = styled.img`
  width: 50%;
  border-radius: 10px 40px 40px 10px;
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
export default FieldDetails;

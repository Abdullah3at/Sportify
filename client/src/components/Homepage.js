import { BiFootball } from "react-icons/bi";
import styled from "styled-components";
import { useState, useEffect } from "react";
import IndoorCard from "./IndoorCard";
import OutdoorCard from "./OutdoorCard";
import { NavLink } from "react-router-dom";

const Home = () => {
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
    <Container>
      <SubContainer>
        <IndoorCard />
      </SubContainer>
      <SubContainer>
        <OutdoorCard />
      </SubContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  display: flex;
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

export default Home;

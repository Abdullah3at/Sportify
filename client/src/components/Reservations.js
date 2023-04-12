import UserProvider from "./UserContext";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { BiFootball } from "react-icons/bi";
import styled from "styled-components";

const Reservations = () => {
  const [details, setDetails] = useState("");
  const { user } = useContext(UserContext);

  const handleRemove = (id) => {
    // const id = details[0]._id;
    console.log(id);
    setDetails(details.filter((detail) => detail._id !== id));
    fetch(`/delete-reservation/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  useEffect(() => {
    console.log("User", user);
    if (user) {
      fetch(`/reservation/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setDetails(data.result);
          console.log(data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  if (!user) {
    return <Div>Please LogIn</Div>;
  } else if (!details) {
    return (
      <LoaderIconPosition>
        <LoaderIcon />
      </LoaderIconPosition>
    );
  } else if (details == 0) {
    return (
      <TextContainer>
        <Text>
          "Sorry, you don't have any reservations at this time. Please make a
          reservation to secure your spot."
        </Text>
      </TextContainer>
    );
  }

  return (
    <div>
      {user && (
        <Container>
          {details.map((detail, i) => (
            <SubContainer key={i}>
              <P>Name : {detail.name}</P>
              <P>{detail._id}</P>
              <P>Start Time : {detail.time}</P>
              <P>Email : {detail.email}</P>
              <RemoveButton
                onClick={(ev) => {
                  ev.preventDefault();
                  handleRemove(detail._id);
                }}
              >
                x
              </RemoveButton>
            </SubContainer>
          ))}
          {/* <p>{details[0].name}</p> */}
          {/* <p>{details[0].name}</p>
      <p>{details[1].name}</p> */}
          {/* <UserProvider>aa</UserProvider> */}
        </Container>
      )}
    </div>
  );
};
console.log();

const TextContainer = styled.div`
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  padding: 24px;
  margin: 100px;
  background-color: #f5f5f5;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const Text = styled.p`
  margin: 50 0 32px;
`;

const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  color: gray;
  cursor: pointer;
  font-size: 1.2rem;
  font-size: 30px;
  /* margin-top: 20px; */
  transition: color 0.2s;

  &:hover {
    color: darkgreen;
  }
`;

const Div = styled.div`
  font-size: 40px;
  margin: 100px;

  margin-top: 100px;
`;
const P = styled.p`
  color: black;
`;

const SubContainer = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 50px 0px 50px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to bottom right, #ccffcc, #f0f8ff);
  color: #fff;
  font-size: 26px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;

  flex-direction: column;
  padding: 80px;
  background-color: #f8f8f8;
  border-radius: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
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

export default Reservations;

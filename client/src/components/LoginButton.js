import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Loginbutton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <div>
        <Button onClick={() => loginWithRedirect()}>Log In</Button>
      </div>
    )
  );
};

const Button = styled.button`
  background-color: white;
  color: darkgreen;
  padding: 10px 100px;
  margin-left: -100px;
  border: 1px solid darkgreen;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkgreen;
    color: white;
  }
`;

export default Loginbutton;

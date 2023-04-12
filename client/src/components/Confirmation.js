import React from "react";
import styled from "styled-components";

const Confirmation = () => {
  return (
    <Container>
      <Message />
      Thanks for booking the football field on <Name>SPORTIFY</Name>! We've got
      your request and we're working on processing it right now.
      <Message />
      <Message />
      We'll send you an email soon with all the details of your booking. If you
      have any questions or concerns, just hit us up.
      <Message />
      <Message />
      Cheers,
      <Message />
    </Container>
  );
};

const Container = styled.div`
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  padding: 24px;
  margin: 20px;
  background-color: #f5f5f5;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const Name = styled.span`
  font-weight: bold;
`;

const Message = styled.p`
  margin: 0 0 32px;
`;

export default Confirmation;

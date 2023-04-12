import styled from "styled-components";
import backgrounImg from "./images/backgroundFooter.png";
import logo from "./images/logo.png";

const Footer = () => {
  return (
    <Container>
      <Img src={backgrounImg} />
      <Logo src={logo} />
      <PContainer>
        <TextContainer>
          <P>Contact us:</P>
          <P>Phone: 123-456-7890</P>
        </TextContainer>
        <TextContainer>
          <P>Location:</P>
          <P> 123 Main Street, Anytown CA</P>
        </TextContainer>
        <TextContainer>
          <P>Schedule:</P>
          <P> Monday to Saturday, 11am to 7pm</P>
        </TextContainer>
      </PContainer>
    </Container>
  );
};

const Logo = styled.img`
  position: relative;
  z-index: 1;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 130px;
`;
const PContainer = styled.div`
  display: flex;
  margin-left: 150px;
`;
const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;
const P = styled.p`
  position: relative;
  z-index: 1;
  color: white;
  margin-right: 40px;
  font-weight: bold;
  font-family: "Trebuchet MS";
  font-size: 18px;
`;
const Container = styled.div`
  position: relative;
  height: 350px;
  display: flex;
`;

export default Footer;

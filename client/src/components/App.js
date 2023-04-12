import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Homepage from "./Homepage";
import Footer from "./Footer";
import Indoor from "./indoor";
import Reservations from "./Reservations";
import Outdoor from "./outdoor";
import FieldDetails from "./FieldDetails";
import { useAuth0 } from "@auth0/auth0-react";
import { BiFootball } from "react-icons/bi";

const App = () => {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return (
      <LoaderIconPosition>
        <LoaderIcon />
      </LoaderIconPosition>
    );
  }
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/indoor" element={<Indoor />} />
        <Route path="/outdoor" element={<Outdoor />} />
        <Route path="/indoor/:id" element={<FieldDetails />} />
        <Route path="/outdoor/:id" element={<FieldDetails />} />
        <Route path="/Reservations" element={<Reservations />} />
      </Routes>
      <Footer />
    </Router>
  );
};

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

export default App;

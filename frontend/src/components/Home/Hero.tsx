import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const JoinButton = styled(Link)`
  background-color: #bf0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  width: 200px;
  height: 60px;
  margin-top: 20px;
  &:hover {
    background-color: #a00a0a;
  }
`;

const Hero = () => {
  return (
    <section
      style={{ height: "600px", backgroundColor: "#fbf5f1", width: "100%" }}
    >
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "600px",
          }}
        >
          <h1 style={{ fontSize: "64px", fontWeight: "bold", fontFamily: 'Poppins', lineHeight: 1.5 }}>
            Stay Ahead of the Competition
          </h1>
          <p style={{ fontSize: "18px", fontFamily: 'Inter', color : '#40201E', lineHeight: 1.75}}>
            Get notified with real-time notifications of the latest internship
            opportunities, ensuring you never miss a chance to advance your
            career.
          </p>
          <JoinButton to="/pricing" style = {{fontFamily: 'Poppins'}}>Start 14 Day Trial</JoinButton>
        </div>
      </div>

      <div style={{ width: "50%" }}></div>
    </section>
  );
};

export default Hero;

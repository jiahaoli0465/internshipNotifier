import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const JoinButton = styled(Link)`
  background-color: #bf0a0a;
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  width: 200px;

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
          <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
            Stay Ahead of the Competition
          </h1>
          <p style={{ fontSize: "20px" }}>
            Get notified with real-time notifications of the latest internship
            opportunities, ensuring you never miss a chance to advance your
            career.
          </p>
          <JoinButton to="/pricing">Start 14 Day Trial</JoinButton>
        </div>
      </div>

      <div style={{ width: "50%" }}></div>
    </section>
  );
};

export default Hero;

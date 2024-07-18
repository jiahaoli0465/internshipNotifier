import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import phone from "../../assets/Phone.svg"
import notif from "../../assets/Notif.svg"

const JoinButton = styled(Link)`
  background-color: #bf0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  width: 200px;
  height: 60px;
  margin-top: 0;
  margin-left: 20%;
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
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",

            
          }}
        >
          <h1 style={{ fontSize: "50px", fontWeight: "bold", fontFamily: 'Poppins', lineHeight: 1.5, marginLeft: "20%" }}>
            Stay Ahead of the Competition
          </h1>
          <div style = {{width: "80%"}}>
          <p style={{ fontSize: "18px", fontFamily: 'Inter', color : '#40201E', lineHeight: 1.75, marginTop: "-6%", marginLeft: "25%"}}>
            Get notified with real-time notifications of the latest internship
            opportunities, ensuring you never miss a chance to advance your
            career.
          </p>
          </div>
          <JoinButton to="/pricing" style = {{fontFamily: 'Poppins'}}>Start 14 Day Trial</JoinButton>
        </div>
        <div style={{ width: "50%" }}>
      <img src = {phone} alt="Phone" style={{ width: "300px", height: "auto", marginLeft: 200}} />
      <img src={notif} alt="Notification" style = {{width: "230px", height: "auto", marginLeft: 200}} />
      </div>
      </div>
     
    </section>
  );
};

export default Hero;

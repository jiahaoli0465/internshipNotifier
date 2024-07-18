import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";


// Styled components for the navbar
const Navbar = styled.nav`
  background-color: #fbf5f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  height: 80px;
  font-family: 'Poppins', sans-serif;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 45px;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
<<<<<<< HEAD
  margin : 
=======
  &:hover {
    cursor: pointer;
    }
>>>>>>> origin/main
`;

const LogoSpan = styled.span`
  color: #bf0a0a;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  font-family: 'Poppins', sans-serif;
`;

const NavLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  margin: 0 20px;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  &:hover {
    color: #bf0a0a;
    text-decoration: underline;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Poppins', sans-serif;
`;

const AuthLink = styled(Link)`
  color: #bf0a0a;
  text-decoration: none;
  margin: 0 20px;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  &:hover {
    // font-weight: bold;
  }
`;

const SignUpButton = styled(Link)`
  background-color: #bf0a0a;
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #a00a0a;
  }
`;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <Navbar>
          <Logo onClick={()=> navigate('/')}>
            Intern<LogoSpan>ly</LogoSpan>
          </Logo>
          <NavLinks>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/pricing">Pricing</NavLink>
            </li>
            <li>
              <NavLink to="/listings">Job Listings</NavLink>
            </li>
          </NavLinks>
          <AuthButtons>
            <AuthLink to="/login">Login</AuthLink>
            <SignUpButton to="/sign-up">Sign Up</SignUpButton>
          </AuthButtons>
        </Navbar>
      </header>
      <main style={{backgroundColor: "#FBF5F1"}}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

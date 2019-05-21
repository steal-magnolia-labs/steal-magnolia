import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const TitleBarComponent = () => {
  const logoutOnClickFunction = () => {
    console.log(' clicked log out ')
    fetch('/logout')
      .catch(err => console.log("logout error:", err))
  };

  return (
    <Header>
      <Link className="link" to="/login">
        <Logo>Magnolia</Logo>
      </Link>
      <RightNav>
        <Link className="right-link" to="/projectpage">Projects</Link>
        <LogoutBtn className="right-link" onClick={logoutOnClickFunction} >Logout</LogoutBtn>
      </RightNav>
    </Header>
  )
}

const LogoutBtn = styled.button`
  background-color: #847996;
  border: none;
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  :focus{
    outline: none;
  }
`

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-family: 'Raleway', sans-serif;
    padding: 20px;
    border-radius: 3px;
    background-color: #847996;
`

const Logo = styled.h2`
  font-family: 'Raleway', sans-serif;
  color: white;
`

const RightNav = styled.div`
  display: flex;
  width: 200px;
  justify-content: flex-end;
`

export default TitleBarComponent;

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
      <div className='nav-container'>
        <Link className="link" to="/">
          <Logo>Steal Magnolia</Logo>
        </Link>
        <RightNav>
          <Link className="header-link" to="/projectpage">Projects</Link>
          <LogoutBtn className="header-link" onClick={logoutOnClickFunction} >Logout</LogoutBtn>
        </RightNav>
      </div>
    </Header>
  )
}

const LogoutBtn = styled.button`
  background: none;
  border: none;
  :focus{
    outline: none;
  }
`

const Header = styled.header`
    background-color: #D9C7C5;
    display: flex;
    justify-content: center;
`

const Logo = styled.h2`
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  color: #731A4B;
`

const RightNav = styled.div`
  display: flex;
  width: 200px;
  justify-content: flex-end;
`

export default TitleBarComponent;

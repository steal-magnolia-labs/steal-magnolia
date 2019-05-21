import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
//Components utilized in this page
import Login from './login.js';
import Homepage from './containers/homepage.js';
import ProjectCanvas from './containers/project.js';


const App = () => {

    const Logout = () => {
      console.log(' clicked log out ')
      fetch('/logout')
        .catch(err => console.log(err))

    }

    return (
      <Router>
        <Header>
          <Link className="link" to="/login"><Logo>Magnolia</Logo></Link>
          <RightNav>
            <Link className="right-link" to="/projectpage">Projects</Link>
            <LogoutBtn className="right-link" onClick={Logout} >Logout</LogoutBtn>
          </RightNav>
        </Header>
        <Route path="/login" component={ Login } />
        <Route path="/projectpage" component={ Homepage } />
        <Route path="/project/:id" component={ ProjectCanvas } />
      </Router>
    )
}

export default App;

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


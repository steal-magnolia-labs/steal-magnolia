import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import google from '../images/google.png';
import logo from '../images/group.png';

const Login = () => {
  let [redirectNeeded, setRedirectNeeded] = useState(false);

  const authorizeWithGoogle = props => {
    const metaData = {
      method: 'GET',
      'Content-type': 'application/json',
      Accept: 'text/html',
    };

    fetch('/google-init', metaData)
      .then(response => {
        // console.log('google-init-response:', response);
        setRedirectNeeded(true);
      })
      .catch(err => console.error('google-init-error:', err));
  };

  return (
    <div className='login-container'>
      <div className='login-screen'>
        <div className='welcome-box'>
          <WelcomeMessage className="welcome"><u>STEAL</u> MAGNOLIA
          </WelcomeMessage>
          <img className="logo" id="rotating" src={logo} />
          <img className="google-button" src={google} onClick={authorizeWithGoogle} />
          {redirectNeeded && <Redirect to="/google-init" />}
        </div>
      </div>
      <Footer>
        <span className='labs'>Steal Magnolia Labs</span>   Copyright 2019
      </Footer>
    </div>
  );
};

export default Login;

const LoginBtn = styled.button`
  background-image: url(${google}); 
`;

const WelcomeMessage = styled.section`
  font-family: 'Raleway', sans-serif;
  min-width: 650px;
  text-align: center;
  color: #731A4B;
  padding: 70px 0px;
  font-size: 90px;
  font-weight: 900;
  letter-spacing: 3px;
`;

const Footer = styled.section`
  font-family: 'Raleway', sans-serif;
  min-width: 650px;
  text-align: center;
  padding: 70px 20px;
  font-size: 20px;
  color: #731A4B;
  background-color: #D9C7C5;
  font-weight: 900;
`;

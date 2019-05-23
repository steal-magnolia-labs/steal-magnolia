import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import google from '../images/google.png';

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
    <>
      <LoginScreen>
        <WelcomeMessage className="welcome">Welcome to <u>Steal</u> Magnolia Labs</WelcomeMessage>
        <img className="google-button" src={google} onClick={authorizeWithGoogle} />
        {redirectNeeded && <Redirect to="/google-init" />}
      </LoginScreen>
    </>
  );
};

export default Login;

const LoginBtn = styled.button`
  background-image: url(${google}); 
`;

const LoginScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  background-color: #f8f9fb;
  border-radius: 3px;
`;

const WelcomeMessage = styled.section`
  font-family: 'Raleway', sans-serif;
  min-width: 650px;
  border: 1px solid black;
  text-align: center;
  padding: 70px 0px;
  font-size: 40px;
  background-color: white;
`;

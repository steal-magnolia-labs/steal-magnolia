import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

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
    <LoginScreen>
      <WelcomeMessage>Welcome to <u>Steal</u> Magnolia Labs</WelcomeMessage>
      <LoginBtn onClick={authorizeWithGoogle}>Login with Google</LoginBtn>
      {redirectNeeded && <Redirect to="/google-init" />}
    </LoginScreen>
  );
};

export default Login;

const LoginBtn = styled.button`
  font-family: 'Raleway', sans-serif;
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  font-size: 18px;

  :focus {
    outline: none;
  }

  :hover {
    box-shadow: 1px 2px 4px grey;
  }
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

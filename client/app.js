import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

// Importing components utilized in this page
import Login from './login.js';
import Homepage from './containers/homepage.js';
import ProjectCanvas from './containers/project.js';
import TitleBarComponent from './components/TitleBarComponent';

const App = () => (
    <Router>
      <TitleBarComponent />
      <Route path="/login" component={Login} />
      <Route path="/projectpage" component={Homepage} />
      <Route path="/project/:id" component={ProjectCanvas} />
    </Router>
  );

export default App;

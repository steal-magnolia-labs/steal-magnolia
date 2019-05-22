import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';

// Importing components utilized in this page
import Login from './components/LoginPage.jsx';
import ProjectPage from './containers/ProjectPage.jsx';
import ProjectCanvas from './containers/ProjectCanvas.jsx';
import TitleBarComponent from './components/TitleBarComponent.jsx';

render(
  <Router>
    <TitleBarComponent />
    <Route path="/" exact component={Login} />
    <Route path="/projectpage" component={ProjectPage} />
    <Route path='/google-init' component={() => {
      window.location.href = 'http://localhost:3000/google-init';
      return null;
    }} />
    <Route path="/project/:id" component={ProjectCanvas} />
  </Router>,
  
   document.getElementById('app')
   );

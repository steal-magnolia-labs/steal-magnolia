import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Importing components utilized in this page
import Login from './login.js';
import Homepage from './containers/homepage.js';
import ProjectCanvas from './containers/project.js';
import TitleBarComponent from './components/TitleBarComponent.jsx';

const App = () => (
    <Router>
      <TitleBarComponent />
      <Route path="/" exact component={Login} />
      <Route path="/projectpage" component={Homepage} />
      <Route path='/google-init' component={() => {
        window.location.href = 'http://localhost:3000/google-init';
        return null;
      }} />
      <Route path="/project/:id" component={ProjectCanvas} />
    </Router>
  );

export default App;

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Importing components utilized in this page
import Login from './login.js';
import Homepage from './containers/homepage.js';
import ProjectCanvas from './containers/project.js';
<<<<<<< HEAD


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
=======
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
>>>>>>> dev

export default App;

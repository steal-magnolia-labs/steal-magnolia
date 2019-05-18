import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hello: 'world' };
  }
  render() {
    return(
      <header>
        Magnolia 🌸
      </header>
    )
  }
}

render(<App />, document.getElementById('app'));
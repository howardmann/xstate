import React, { Component } from 'react';
import TrafficLight from './TrafficLight'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>State Machines Traffic Lights</h1>
        <TrafficLight/>
      </div>
    );
  }
}

export default App;

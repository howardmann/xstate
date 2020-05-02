import React, { Component } from 'react';
import './App.css';
import Feedback from './components/Feedback'

class App extends Component {
  render() {
    return (
      <div>
        <h2>XState Feedback</h2>
        <Feedback/>
      </div>
    );
  }
}

export default App;

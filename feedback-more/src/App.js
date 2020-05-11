import React, { Component } from 'react';
import './App.css';
import 'notyf/notyf.min.css';
import Feedback from './components/Feedback'

class App extends Component {
  render() {
    return (
      <div>
        <h2>XState Feedback Conditional</h2>
        <Feedback/>
      </div>
    );
  }
}

export default App;

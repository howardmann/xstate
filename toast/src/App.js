import React, { Component } from 'react';
import './App.css';
import 'notyf/notyf.min.css';
import Light from './components/Light'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>XState Toggle</h3>
        <Light/>
      </div>
    );
  }
}

export default App;

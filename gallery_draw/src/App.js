import React, { Component } from 'react';
import Gallery from './Gallery.js'
import './index.css'
class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col col-6 center">
            <h4>Drawer 1</h4>
            <Gallery/>
          </div>
          <div className="col col-6 center">
            <h4>Drawer 2</h4>
            <Gallery/>
          </div>          
        </div>
      </div>
    );
  }
}

export default App;

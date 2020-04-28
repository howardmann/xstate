import React, { Component } from 'react';
import Gallery from './Gallery.js'
import './index.css'
class App extends Component {
  render() {
    return (
      <div>
        <h1>Gallery</h1>
        <div className="row">
          <div className="col col-6 center">
            <h2>Drawer 1</h2>
            <Gallery/>
          </div>
          <div className="col col-6 center">
            <h2>Drawer 2</h2>
            <Gallery/>
          </div>          
        </div>
      </div>
    );
  }
}

export default App;
